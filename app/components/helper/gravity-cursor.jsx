"use client";

import { useEffect, useRef } from "react";

export default function GravityCursor() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef([]);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const PARTICLE_COUNT = 55;
        const GRAVITY_RADIUS = 250;
        const GRAVITY_STRENGTH = 0.1;
        const DAMPENING = 0.96;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticles() {
            const particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 2.5 + 1.5,
                    baseOpacity: Math.random() * 0.35 + 0.25,
                    opacity: 0.25,
                    hue: Math.random() * 30 + 25,
                });
            }
            return particles;
        }

        function drawParticle(p) {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
            gradient.addColorStop(0, `hsla(${p.hue}, 40%, 70%, ${p.opacity})`);
            gradient.addColorStop(0.5, `hsla(${p.hue}, 40%, 60%, ${p.opacity * 0.3})`);
            gradient.addColorStop(1, `hsla(${p.hue}, 40%, 50%, 0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 50%, 78%, ${p.opacity + 0.15})`;
            ctx.fill();
        }

        function drawConnections(particles, mx, my) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        const midX = (particles[i].x + particles[j].x) / 2;
                        const midY = (particles[i].y + particles[j].y) / 2;
                        const dc = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
                        if (dc < GRAVITY_RADIUS * 1.5) {
                            const a = (1 - dist / 140) * (1 - dc / (GRAVITY_RADIUS * 1.5)) * 0.35;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `hsla(40,40%,70%,${a})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mouse = mouseRef.current;
            const particles = particlesRef.current;

            if (mouse.x > 0 && mouse.y > 0) {
                const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, GRAVITY_RADIUS);
                g.addColorStop(0, "hsla(40,50%,70%,0.035)");
                g.addColorStop(1, "hsla(40,50%,70%,0)");
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, GRAVITY_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
            }

            for (const p of particles) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < GRAVITY_RADIUS && dist > 3) {
                    const force = (GRAVITY_STRENGTH * (GRAVITY_RADIUS - dist)) / GRAVITY_RADIUS;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                    p.opacity = Math.min(p.baseOpacity + 0.4, p.opacity + 0.025);
                } else {
                    p.opacity = Math.max(p.baseOpacity, p.opacity - 0.008);
                }
                p.vx += (Math.random() - 0.5) * 0.012;
                p.vy += (Math.random() - 0.5) * 0.012;
                p.vx *= DAMPENING; p.vy *= DAMPENING;
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
                if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -0.5; }
                if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
                if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -0.5; }
                drawParticle(p);
            }
            drawConnections(particles, mouse.x, mouse.y);
            rafRef.current = requestAnimationFrame(animate);
        }

        resize();
        particlesRef.current = createParticles();
        animate();
        const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("resize", resize);
        return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", resize); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);

    return <canvas ref={canvasRef} id="gravity-canvas" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9999 }} />;
}
