import { redirect } from "next/navigation";
import { isOperatorAuthenticated } from "@/lib/auth";
import { ConsoleShell } from "@/components/console-shell";

export const dynamic = "force-dynamic";
export default async function ProtectedConsole({ children }: { children: React.ReactNode }) {
  if (!(await isOperatorAuthenticated())) redirect("/login");
  return <ConsoleShell>{children}</ConsoleShell>;
}
