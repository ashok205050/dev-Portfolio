"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";

// Original Feature: Morphing Text
function MorphingText({ words, interval = 2500 }) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span style={{
      display: "inline-block",
      color: "var(--accent)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(8px)",
      minWidth: "10ch",
    }}>
      {words[index]}
    </span>
  );
}

function HeroSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(200,169,126,0.03), transparent 60%)" }} />

      <div className="section-container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", alignItems: "center" }} className="lg:!grid-cols-[1.1fr_0.9fr] lg:!gap-12">
          {/* Left Content */}
          <div className="order-2 lg:!order-1" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <div>
              <p className="animate-on-scroll" style={{ fontSize: "0.75rem", color: "var(--fg-muted)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Hey, I&apos;m Ashok Maurya
              </p>
              <h1 className="animate-on-scroll delay-1" style={{ lineHeight: 1.05 }}>
                I build things
                <br />
                for the <MorphingText words={["web", "future", "people", "internet"]} />
              </h1>
            </div>

            <p className="animate-on-scroll delay-2" style={{ color: "var(--fg-secondary)", maxWidth: "26rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Fullstack developer passionate about crafting fast, scalable,
              and beautiful web applications. Currently open to new opportunities.
            </p>

            {/* Buttons */}
            <div className="animate-on-scroll delay-3" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/#projects" className="btn-primary">View My Work</Link>
              <Link href={personalData.resume} target="_blank" className="btn-secondary">
                <span>Resume</span><MdDownload size={15} />
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-on-scroll delay-4" style={{ display: "flex", gap: "2.5rem", paddingTop: "0.5rem" }}>
              {[
                { n: "4+", l: "Projects" },
                { n: "18+", l: "Technologies" },
                { n: "3+", l: "Years" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg-primary)" }}>{n}</p>
                  <p style={{ fontSize: "0.65rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 2 }}>{l}</p>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="animate-on-scroll delay-5" style={{ display: "flex", gap: "0.6rem", paddingTop: "0.25rem" }}>
              {[{ href: personalData.github, Icon: BsGithub }, { href: personalData.linkedIn, Icon: BsLinkedin }].map(({ href, Icon }) => (
                <Link key={href} href={href} target="_blank" style={{
                  width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border-light)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-muted)", transition: "all 0.3s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border-light)"; }}
                ><Icon size={16} /></Link>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:!order-2 animate-on-scroll" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 420, aspectRatio: "1", borderRadius: "1.25rem", overflow: "hidden", border: "1px solid var(--border-clr)" }}>
              <Image src="/hero-portrait.png" alt="Ashok Maurya" fill className="object-cover" priority sizes="(max-width: 768px) 90vw, 420px" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 40%)" }} />
              {/* Code badge */}
              <div style={{
                position: "absolute", bottom: 16, left: 16, padding: "0.5rem 0.75rem",
                background: "rgba(10,10,10,0.8)", backdropFilter: "blur(8px)",
                borderRadius: 8, fontFamily: "monospace", fontSize: "0.65rem", color: "var(--accent)",
              }}>
                <span style={{ color: "var(--fg-muted)" }}>~/</span>fullstack-dev<span style={{ animation: "blink 1s infinite" }}>_</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--fg-muted)" }}>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
      </div>
    </section>
  );
}

export default HeroSection;