"use client";

import { useEffect, useRef } from "react";

const testimonials = [
    { id: 1, name: "Alex Chen", role: "Product Manager, TechFlow", quote: "Working with Ashok was an incredible experience. His technical prowess combined with an eye for design resulted in a product that exceeded our expectations.", initials: "AC" },
    { id: 2, name: "Sarah Mitchell", role: "Founder, DesignLab", quote: "Ashok delivered a stunning web application that perfectly captured our vision. His ability to translate complex requirements into elegant solutions is truly impressive.", initials: "SM" },
    { id: 3, name: "Mark Foster", role: "CTO, NextWave", quote: "Exceptional development skills paired with great communication. Ashok not only built what we asked for but suggested improvements that made the final product even better.", initials: "MF" },
];

function Testimonials() {
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
        <section id="testimonials" ref={sectionRef}>
            <div className="divider" />
            <div className="section-container">
                <div style={{ marginBottom: "3rem" }}>
                    <p className="animate-on-scroll section-label">What People Say</p>
                    <h2 className="animate-on-scroll delay-1 section-title">Kind Words</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="md:!grid-cols-3">
                    {testimonials.map((t, i) => (
                        <div key={t.id} className={`animate-on-scroll delay-${i + 2} glass-card`} style={{ padding: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", height: "100%" }}>
                                {/* Quote */}
                                <p style={{ fontSize: "0.85rem", color: "var(--fg-secondary)", lineHeight: 1.65, fontStyle: "italic", flex: 1 }}>
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                {/* Author */}
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-clr)" }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: "50%", background: "var(--bg-secondary)", border: "1px solid var(--border-clr)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontFamily: "var(--font-display)", fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)",
                                    }}>{t.initials}</div>
                                    <div>
                                        <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--fg-primary)" }}>{t.name}</p>
                                        <p style={{ fontSize: "0.65rem", color: "var(--fg-muted)" }}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
