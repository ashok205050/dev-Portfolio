"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { useEffect, useRef } from "react";

function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".animate-on-scroll").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stack = ["React", "Next.js", "Node.js", "MongoDB", "Express", "TypeScript", "Tailwind", "PostgreSQL", "GitHub", "JavaScript","Python (Django)", "RESTful APIs", "Authentication (JWT, OAuth)","+ more"];

  return (
    <section id="about" ref={sectionRef}>
      <div className="divider" />
      <div className="section-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }} className="lg:!grid-cols-2 lg:!gap-16">
          {/* Image */}
          <div className="animate-on-scroll" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 380, aspectRatio: "4/3", borderRadius: "1rem", overflow: "hidden", border: "1px solid var(--border-clr)" }}>
              <Image src="/about-workspace.png" alt="Developer Workspace" fill className="object-cover" sizes="380px" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.3), transparent)" }} />
            </div>
          </div>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <p className="animate-on-scroll section-label">About Me</p>
              <h2 className="animate-on-scroll delay-1 section-title">
                Fullstack developer<br />who loves to <span style={{ color: "var(--accent)" }}>build</span>
              </h2>
            </div>

            <p className="animate-on-scroll delay-2" style={{ color: "var(--fg-secondary)", lineHeight: 1.75 }}>
              {personalData.description}
            </p>

            {/* Tech Stack */}
            <div className="animate-on-scroll delay-3">
              <p style={{ fontSize: "0.65rem", color: "var(--fg-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Tech Stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {stack.map((tech) => (
                  <span key={tech} style={{
                    padding: "0.35rem 0.85rem", borderRadius: 50, fontSize: "0.7rem", fontWeight: 500,
                    border: "1px solid var(--border-clr)", color: "var(--fg-muted)", background: "var(--bg-secondary)",
                    transition: "all 0.3s", cursor: "default",
                  }}
                    onMouseEnter={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; }}
                    onMouseLeave={(e) => { e.target.style.borderColor = "var(--border-clr)"; e.target.style.color = "var(--fg-muted)"; }}
                  >{tech}</span>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll delay-4" style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.5rem" }}>
              <span style={{ width: 40, height: 1, background: "var(--accent)" }} />
              <span style={{ fontSize: "0.7rem", color: "var(--fg-muted)", letterSpacing: "0.08em" }}>Open to opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;