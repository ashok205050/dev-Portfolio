"use client";

import { projectsData } from "@/utils/data/projects-data";
import Link from "next/link";
import { useEffect, useRef, useCallback, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BsGithub } from "react-icons/bs";

// Original Feature: 3D Tilt Card
function TiltCard({ children, className = "", style = {} }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  }, []);

  return (
    <div ref={cardRef} className={className} style={{ ...style, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
    >{children}</div>
  );
}

const Projects = () => {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".animate-on-scroll").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="divider" />
      <div className="section-container">
        <div style={{ marginBottom: "3rem" }}>
          <p className="animate-on-scroll section-label">Selected Work</p>
          <h2 className="animate-on-scroll delay-1 section-title">Projects I&apos;ve Built</h2>
          <p className="animate-on-scroll delay-2" style={{ color: "var(--fg-secondary)", marginTop: "0.75rem", maxWidth: 440 }}>
            Real applications shipped to production — from e-commerce to real-time collaboration.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="md:!grid-cols-2">
          {projectsData.map((project, index) => (
            <TiltCard key={project.id} className={`animate-on-scroll delay-${Math.min(index + 2, 5)} glass-card`} style={{ overflow: "hidden", cursor: "pointer" }}>
              <div onClick={() => setSelectedProject(project)} style={{ height: "100%", width: "100%" }}>
                <div style={{ height: 3, background: `linear-gradient(to right, var(--accent), transparent)`, opacity: 0.4 }} />
                <div style={{ padding: "clamp(1.25rem, 2.5vw, 1.75rem)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {/* Number + Links */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.65rem", color: "var(--fg-muted)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {project.code && (
                        <Link href={project.code} target="_blank" style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border-clr)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-muted)", transition: "all 0.3s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border-clr)"; }}
                        ><BsGithub size={14} /></Link>
                      )}
                      {project.demo && (
                        <Link href={project.demo} target="_blank" style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border-clr)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-muted)", transition: "all 0.3s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border-clr)"; }}
                        ><HiOutlineExternalLink size={14} /></Link>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--fg-primary)" }}>{project.name}</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--fg-secondary)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{project.description}</p>

                  {/* Tools */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {project.tools.slice(0, 5).map((tool) => (
                      <span key={tool} style={{ padding: "0.2rem 0.6rem", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 50, border: "1px solid var(--border-clr)", color: "var(--fg-muted)", background: "var(--bg-secondary)" }}>{tool}</span>
                    ))}
                    {project.tools.length > 5 && (
                      <span style={{ padding: "0.2rem 0.6rem", fontSize: "0.55rem", fontWeight: 500, borderRadius: 50, border: "1px solid var(--border-clr)", color: "var(--fg-muted)", background: "var(--bg-secondary)" }}>+{project.tools.length - 5}</span>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999,
            background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
            animation: "fadeIn 0.3s ease-out forwards"
          }} onClick={() => setSelectedProject(null)}>
            <div style={{
              background: "var(--bg-primary)", border: "1px solid var(--border-clr)",
              borderRadius: "1rem", width: "100%", maxWidth: "800px", maxHeight: "90vh",
              overflowY: "auto", position: "relative",
              animation: "scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }} onClick={(e) => e.stopPropagation()} className="glass-card">

              <button onClick={() => setSelectedProject(null)} style={{
                position: "absolute", top: "1rem", right: "1rem", background: "var(--bg-secondary)",
                border: "1px solid var(--border-clr)", borderRadius: "50%", width: "2.5rem", height: "2.5rem",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-muted)",
                cursor: "pointer", transition: "all 0.2s", zIndex: 10
              }} onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border-clr)"; }}>
                ✕
              </button>

              <div style={{ padding: "clamp(1.5rem, 3vw, 3rem)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, color: "var(--fg-primary)", marginBottom: "1rem", paddingRight: "3rem", lineHeight: 1.2 }}>
                  {selectedProject.name}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {selectedProject.tools.map((tool) => (
                    <span key={tool} style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", borderRadius: 50, border: "1px solid var(--border-clr)", color: "var(--fg-primary)", background: "var(--bg-secondary)" }}>{tool}</span>
                  ))}
                </div>

                <div style={{ width: "100%", height: 1, background: "var(--border-clr)", marginBottom: "1.5rem" }} />

                <p style={{ fontSize: "1rem", color: "var(--fg-secondary)", lineHeight: 1.8, marginBottom: "2rem", whiteSpace: "pre-wrap" }}>
                  {selectedProject.description}
                </p>

                {(selectedProject.role || selectedProject.code || selectedProject.demo) && (
                  <div style={{ padding: "1.5rem", background: "var(--bg-secondary)", borderRadius: "0.75rem", border: "1px solid var(--border-clr)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {selectedProject.role && (
                      <div>
                        <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>Role</span>
                        <span style={{ fontSize: "0.95rem", color: "var(--fg-primary)", fontWeight: 500 }}>{selectedProject.role}</span>
                      </div>
                    )}

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: selectedProject.role ? "0.5rem" : "0" }}>
                      {selectedProject.code && (
                        <Link href={selectedProject.code} target="_blank" className="btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem", borderRadius: "0.5rem" }}>
                          <BsGithub size={18} /> Source Code
                        </Link>
                      )}
                      {selectedProject.demo && (
                        <Link href={selectedProject.demo} target="_blank" style={{ padding: "0.75rem 1.5rem", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "var(--fg-primary)", border: "1px solid var(--border-clr)", cursor: "pointer", transition: "all 0.3s", borderRadius: "0.5rem", fontWeight: 600 }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-clr)"; e.currentTarget.style.color = "var(--fg-primary)"; }}>
                          <HiOutlineExternalLink size={18} /> Live Demo
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;