"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Braces, Check, CircleAlert, Code2, CornerDownLeft, Play, RefreshCw, Sparkles, Square, Waves } from "lucide-react";
import type { GatewayStatus } from "@/lib/console-types";

type Output = { text: string; status: number | null; elapsedMs: number | null; error: string; complete: boolean };
const initial: Output = { text: "", status: null, elapsedMs: null, error: "", complete: false };

function parseSse(buffer: string, onDelta: (value: string) => void): string {
  const events = buffer.split("\n\n");
  const remaining = events.pop() ?? "";
  for (const event of events) {
    for (const line of event.split("\n")) {
      const cleaned = line.replace(/\r$/, "");
      if (!cleaned.startsWith("data:")) continue;
      const data = cleaned.slice(5).trim();
      if (data === "[DONE]") continue;
      try {
        const parsed: unknown = JSON.parse(data);
        if (parsed && typeof parsed === "object" && "choices" in parsed && Array.isArray(parsed.choices)) {
          const choice = parsed.choices[0] as { delta?: { content?: unknown } } | undefined;
          if (typeof choice?.delta?.content === "string") onDelta(choice.delta.content);
        }
      } catch { /* Unknown event payloads are not displayed as assistant content. */ }
    }
  }
  return remaining;
}

export function Playground() {
  const [prompt, setPrompt] = useState("Explain in three sentences why an AI response needs schema validation.");
  const [stream, setStream] = useState(false);
  const [model, setModel] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<Output>(initial);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => { void (async () => { try { const response = await fetch("/api/gateway/status",{cache:"no-store"}); const data = (await response.json()) as GatewayStatus; setModel(data.model); setConfigured(data.configured); } catch { setConfigured(false); } })(); return () => controller.current?.abort(); }, []);
  async function execute() {
    if (running || !configured || !prompt.trim()) return;
    const ctrl = new AbortController(); controller.current = ctrl;
    const started = performance.now(); setOutput(initial); setRunning(true);
    try {
      const response = await fetch("/api/gateway/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt, stream }), signal: ctrl.signal });
      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok) {
        const text = (await response.text()).slice(0, 1200);
        let error = `Gateway returned HTTP ${response.status}`;
        try { const body: unknown = JSON.parse(text); if (body && typeof body === "object" && "error" in body && typeof body.error === "string") error += `: ${body.error}`; } catch { /* keep opaque */ }
        setOutput({ text: "", status: response.status, elapsedMs: Math.round(performance.now() - started), error, complete: false });return;
      }
      if (stream && contentType.includes("text/event-stream") && response.body) {
        const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = ""; let content = "";
        try {
          for (;;) { const { done, value } = await reader.read(); if (done) break; buffer += decoder.decode(value,{stream:true}).replace(/\r\n/g,"\n"); buffer = parseSse(buffer, delta => { content += delta; setOutput({ text: content, status:response.status, elapsedMs:Math.round(performance.now()-started),error:"",complete:false }); }); }
          buffer += decoder.decode(); parseSse(buffer + "\n\n", delta=>{content+=delta});
        } finally { reader.releaseLock(); }
        setOutput({text:content||"The provider stream contained no text deltas.",status:response.status,elapsedMs:Math.round(performance.now()-started),error:"",complete:true});
      } else {
        const text = (await response.text()).slice(0, 64_000);
        let displayed = text;
        try { const body: unknown = JSON.parse(text); if(body && typeof body==="object" && "choices" in body && Array.isArray(body.choices)){ const choice = body.choices[0] as {message?:{content?:unknown}}|undefined;if(typeof choice?.message?.content==="string") displayed=choice.message.content; } } catch { /* raw response stays visible */ }
        setOutput({text:displayed,status:response.status,elapsedMs:Math.round(performance.now()-started),error:"",complete:true});
      }
    } catch(e) { if(ctrl.signal.aborted) setOutput(prev=>({...prev,error:"Request cancelled",complete:false})); else setOutput(prev=>({...prev,error:e instanceof Error?e.message:"Request failed"})); }
    finally { setRunning(false); controller.current=null; }
  }
  const disabled = !configured || !model;
  return <><div className="console-heading"><div><span className="eyebrow">TEST / MODEL EXECUTION</span><h1>API Playground.</h1><p>Send a real request through the Java Reliability Gateway. Your server-side credentials never reach the browser.</p></div><span className="playground-type"><Sparkles size={16}/> Live gateway test</span></div>
  <div className="playground-grid"><section className="console-panel playground-editor"><div className="panel-title"><div><span className="eyebrow">REQUEST</span><h2>Configure your prompt</h2></div><Braces size={20}/></div>
    <label className="form-label" htmlFor="model">Configured model</label><input className="form-input" id="model" readOnly value={model ?? "Configure GATEWAY_MODEL on the server"} aria-describedby="model-info"/><p id="model-info" className="field-note">Model selection is server-controlled to prevent unapproved routing.</p>
    <label className="form-label" htmlFor="prompt">Message to AI</label><textarea className="prompt-input" id="prompt" value={prompt} onChange={e=>setPrompt(e.target.value)} maxLength={4000} rows={9} placeholder="Enter a request…" disabled={running}/>
    <div className="prompt-meta"><span>Application prompt</span><span>{prompt.length} / 4,000 characters</span></div>
    <div className="playground-toggle"><div><Waves size={18}/><div><strong>Stream response</strong><span>Read text incrementally as the provider sends it</span></div></div><label className="switch" aria-label="Stream response"><input type="checkbox" checked={stream} onChange={e=>setStream(e.target.checked)} disabled={running}/><span/></label></div>
    {!configured && <p className="inline-error" role="status"><CircleAlert size={17}/> Gateway configuration is missing. See <code>.env.example</code>.</p>}
    <div className="playground-footer"><span><CornerDownLeft size={15}/> Secure server-side proxy</span>{running?<button className="btn btn-outline" onClick={()=>controller.current?.abort()}><Square size={15}/> Stop</button>:<button className="btn btn-dark" onClick={()=>void execute()} disabled={disabled || !prompt.trim()}><Play size={16}/> Run request</button>}</div>
  </section>
  <section className="console-panel playground-output"><div className="panel-title"><div><span className="eyebrow">RESPONSE</span><h2>Model output</h2></div><span className={`status-pill ${output.status===200?"pill-green":"pill-muted"}`}>{output.status?`HTTP ${output.status}`:"NO RESPONSE"}</span></div>
  <div className="response-surface" aria-live="polite">{running && !output.text?<div className="response-loading"><RefreshCw size={24} className="spin"/><span>Calling gateway…</span></div>:output.error?<div className="response-error"><CircleAlert size={23}/><strong>Request not completed</strong><p>{output.error}</p></div>:output.text?<pre>{output.text}</pre>:<div className="response-empty"><div className="response-empty-icon"><Code2 size={34}/></div><h3>Waiting for a request</h3><p>Your validated gateway response will appear here. Nothing is simulated.</p></div>}</div>
  <div className="output-footer"><span>{output.complete?<><Check size={15}/> Response received</>:running?"Streaming / waiting…":"Idle"}</span><span>{output.elapsedMs===null?"—":`${output.elapsedMs} ms`}</span></div></section></div>
  <div className="playground-note"><CircleAlert size={19}/><p><strong>Not a business-logic validator.</strong> The gateway performs configured infrastructure checks, not factual verification. Never interpret a model response as automatic claim approval or a completed financial action. Test traffic may incur provider charges.</p><a href="https://github.com/wulgresearch-spec/dataplane-gateway" target="_blank" rel="noreferrer">Backend source <ArrowUpRight size={14}/></a></div>
  </>;
}
