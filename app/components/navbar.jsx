"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScrollY && y > 300);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#expertise", label: "Expertise" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 10000,
        transition: "all 0.4s ease",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-clr)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2.5rem)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
            <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--fg-primary)", letterSpacing: "-0.02em" }}>
              Ashok<span style={{ color: "var(--accent)" }}></span>
            </Link>

            {/* Desktop Nav */}
            <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault();
                    document.getElementById(link.href.replace("/#", ""))?.scrollIntoView({ behavior: "smooth" });
                  }
                }} style={{ fontSize: "0.8rem", color: "var(--fg-muted)", transition: "color 0.3s", letterSpacing: "0.04em" }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--fg-primary)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--fg-muted)")}
                >{link.label}</Link>
              ))}
              <Link href="/#contact" onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }} className="btn-primary" style={{ fontSize: "0.7rem", padding: "0.6rem 1.4rem" }}>Let&apos;s Connect</Link>
            </div>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-btn" style={{ background: "none", border: "none", cursor: "pointer", width: 28, height: 28, display: "flex", flexDirection: "column", justifyContent: "center", gap: 5 }}>
              <span style={{ width: 22, height: 1.5, background: "var(--fg-primary)", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translateY(3.5px)" : "none" }} />
              <span style={{ width: 22, height: 1.5, background: "var(--fg-primary)", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translateY(-3.5px)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" style={{
          position: "fixed", inset: 0, zIndex: 9998, background: "var(--bg-primary)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem",
        }}>
          {navLinks.map((link, i) => (
            <Link key={link.href} href={link.href} onClick={(e) => {
              if (link.href.startsWith("/#")) {
                e.preventDefault();
                document.getElementById(link.href.replace("/#", ""))?.scrollIntoView({ behavior: "smooth" });
              }
              setMobileOpen(false);
            }}
              style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--fg-primary)", animation: `fadeInUp 0.4s ease ${i * 0.08}s both` }}
            >{link.label}</Link>
          ))}
          <Link href="/#contact" onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            setMobileOpen(false);
          }} className="btn-primary" style={{ marginTop: "1rem" }}>Let&apos;s Connect</Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
