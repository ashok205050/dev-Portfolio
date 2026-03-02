"use client";

import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from "./contact-form";

function ContactSection() {
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

  const contactItems = [
    { icon: MdAlternateEmail, label: "Email", value: personalData.email },
    { icon: IoMdCall, label: "Phone", value: personalData.phone },
    { icon: CiLocationOn, label: "Location", value: personalData.address },
  ];

  return (
    <section id="contact" ref={sectionRef}>
      <div className="divider" />
      <div className="section-container">
        <div style={{ marginBottom: "3rem" }}>
          <p className="animate-on-scroll section-label">Say Hello</p>
          <h2 className="animate-on-scroll delay-1 section-title">Let&apos;s Connect</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="lg:!grid-cols-[1.2fr_0.8fr] lg:!gap-12">
          <div className="animate-on-scroll delay-2">
            <ContactForm />
          </div>

          <div className="animate-on-scroll delay-3" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {contactItems.map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-clr)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon style={{ color: "var(--accent)" }} size={18} />
                </div>
                <div>
                  <p style={{ fontSize: "0.6rem", color: "var(--fg-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>{label}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--fg-primary)" }}>{value}</p>
                </div>
              </div>
            ))}

            <div style={{ paddingTop: "0.75rem" }}>
              <p style={{ fontSize: "0.6rem", color: "var(--fg-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Find Me On</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {[{ href: personalData.github, Icon: IoLogoGithub }, { href: personalData.linkedIn, Icon: BiLogoLinkedin }].map(({ href, Icon }) => (
                  <Link key={href} target="_blank" href={href} style={{
                    width: 40, height: 40, borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-clr)",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-muted)", transition: "all 0.3s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-clr)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
                  ><Icon size={18} /></Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;