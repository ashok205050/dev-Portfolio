"use client";

import { useEffect, useRef } from "react";
import { HiOutlineCode, HiOutlineDeviceMobile, HiOutlineServer } from "react-icons/hi";

const expertise = [
    { icon: HiOutlineCode, title: "Frontend Development", description: "Building responsive, interactive UIs with React, Next.js, Tailwind CSS, and modern JavaScript. Pixel-perfect implementations with smooth animations." },
    { icon: HiOutlineDeviceMobile, title: "Full-Stack Applications", description: "End-to-end development from database design to deployment. REST APIs, authentication, real-time features, and cloud hosting on Vercel & AWS." },
    { icon: HiOutlineServer, title: "Backend & Databases", description: "Server-side logic with Node.js & Express. Database architecture with MongoDB & PostgreSQL. Secure, scalable, and well-documented APIs." },
];

function Expertise() {
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
        <section id="expertise" ref={sectionRef}>
            <div className="divider" />
            <div className="section-container">
                <div style={{ marginBottom: "3rem" }}>
                    <p className="animate-on-scroll section-label">What I Do</p>
                    <h2 className="animate-on-scroll delay-1 section-title">My Expertise</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="md:!grid-cols-3">
                    {expertise.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className={`animate-on-scroll delay-${i + 2} glass-card tilt-card`} style={{ cursor: "default" }}>
                                <div style={{ padding: "clamp(1.5rem, 3vw, 2rem)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12, background: "var(--bg-secondary)", border: "1px solid var(--border-clr)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <Icon style={{ width: 22, height: 22, color: "var(--accent)" }} />
                                    </div>
                                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--fg-primary)" }}>{item.title}</h3>
                                    <p style={{ fontSize: "0.82rem", color: "var(--fg-secondary)", lineHeight: 1.7 }}>{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Expertise;
