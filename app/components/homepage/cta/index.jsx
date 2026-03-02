"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

function CTASection() {
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

    return (
        <section ref={sectionRef}>
            <div className="divider" />
            <div className="section-container">
                <div style={{ position: "relative", borderRadius: "1.25rem", overflow: "hidden", minHeight: 400, display: "flex", alignItems: "center" }}>
                    <Image src="/cta-network.png" alt="Tech Network" fill className="object-cover" sizes="100vw" />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.85), rgba(10,10,10,0.4))" }} />

                    <div style={{ position: "relative", zIndex: 2, padding: "clamp(2rem, 5vw, 4rem)", display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 480 }}>
                        <p className="animate-on-scroll section-label">Looking for a Developer?</p>
                        <h2 className="animate-on-scroll delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#f5f0e8", lineHeight: 1.1 }}>
                            Let&apos;s build something <span style={{ color: "var(--accent)" }}>great</span> together
                        </h2>
                        <p className="animate-on-scroll delay-2" style={{ color: "rgba(245,240,232,0.65)", fontSize: "0.85rem", maxWidth: 380 }}>
                            I&apos;m currently open to full-time roles and exciting projects. Let&apos;s talk about what I can do for your team.
                        </p>
                        <div className="animate-on-scroll delay-3" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", paddingTop: "0.5rem" }}>
                            <Link href="/#contact" className="btn-primary">Get in Touch</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTASection;
