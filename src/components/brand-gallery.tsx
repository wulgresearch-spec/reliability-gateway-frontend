import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";

const photographs = [
  {
    src: "/media/team-collaboration.jpg",
    alt: "Colleagues collaborating around a laptop in a bright meeting room",
    title: "Bring teams into the same conversation",
    label: "Collaboration",
  },
  {
    src: "/media/business-analysis.jpg",
    alt: "Professional reviewing business reports beside a laptop",
    title: "Investigate with context",
    label: "Analysis",
  },
  {
    src: "/media/financial-review.jpg",
    alt: "Hands reviewing charts and reports around a desk",
    title: "Make evidence visible",
    label: "Accountability",
  },
  {
    src: "/media/team-agreement.jpg",
    alt: "Colleagues applauding a successful agreement",
    title: "Resolve issues together",
    label: "Alignment",
  },
  {
    src: "/media/team-workshop.jpg",
    alt: "Business and technical team gathered around a laptop",
    title: "Keep people in control",
    label: "Teamwork",
  },
] as const;

export function BrandGallery() {
  return (
    <section className="section section-ice team-gallery-section" aria-labelledby="gallery-heading">
      <div className="container">
        <div id="gallery-heading">
          <SectionHeading
            eyebrow="THE PEOPLE BEHIND RELIABLE AI"
            title="Reliability is a team effort."
            description="Operations, security, product, and engineering teams need a clear view of failures and accountable ways to resolve them. These photographs represent that collaboration—not a product feature or customer testimonial."
          />
        </div>
        <div className="brand-gallery-grid">
          {photographs.map((photo, index) => (
            <figure className={`brand-gallery-card ${index === 0 ? "brand-gallery-featured" : ""}`} key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes={index === 0 ? "(max-width: 760px) 100vw, 66vw" : "(max-width: 760px) 100vw, 33vw"} className="brand-gallery-image" />
              <figcaption className="brand-gallery-caption">
                <span>{photo.label}</span><strong>{photo.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
