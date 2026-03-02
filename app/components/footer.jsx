"use client";

import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import { BsGithub, BsLinkedin } from "react-icons/bs";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--border-clr)", background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem clamp(1rem, 4vw, 2.5rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} className="md:!flex-row md:!items-center md:!justify-between">
          {/* Brand */}
          <div>
            <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--fg-primary)" }}>
              Ashok<span style={{ color: "var(--accent)" }}></span>
            </Link>
            <p style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: "0.5rem", maxWidth: 320 }}>
              Fullstack developer building modern web applications. Currently open to new opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {["About", "Expertise", "Projects", "Contact"].map((link) => (
              <Link key={link} href={`/#${link.toLowerCase()}`} style={{ fontSize: "0.75rem", color: "var(--fg-muted)", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--fg-muted)")}
              >{link}</Link>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[{ href: personalData.github, Icon: BsGithub }, { href: personalData.linkedIn, Icon: BsLinkedin }].map(({ href, Icon }) => (
              <Link key={href} href={href} target="_blank" style={{
                width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border-clr)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fg-muted)", transition: "all 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border-clr)"; }}
              ><Icon size={14} /></Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--border-clr)", textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", color: "var(--fg-muted)" }}>© {currentYear} Ashok Maurya. Built with Next.js & deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;