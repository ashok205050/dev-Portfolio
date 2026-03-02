"use client";

import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({ name: "", email: "", message: "" });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, userInput);
      toast.success("Message sent successfully!");
      setUserInput({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-clr)",
    borderRadius: 12,
    padding: "0.75rem 1rem",
    color: "var(--fg-primary)",
    fontSize: "0.875rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "all 0.3s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    color: "var(--fg-muted)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
  };

  return (
    <div className="glass-card" style={{ padding: "clamp(1.5rem, 3vw, 2rem)" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 600, color: "var(--fg-primary)", marginBottom: "0.5rem" }}>
          Send a Message
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--fg-secondary)" }}>
          Have a question or want to work together? Drop me a line.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Your name"
            maxLength="100"
            required
            onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
            onBlur={checkRequired}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlurCapture={(e) => (e.target.style.borderColor = "var(--border-clr)")}
            value={userInput.name}
          />
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input
            style={inputStyle}
            type="email"
            placeholder="your@email.com"
            maxLength="100"
            required
            value={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border-clr)";
              checkRequired();
              setError({ ...error, email: !isValidEmail(userInput.email) });
            }}
          />
          {error.email && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: 4 }}>Please provide a valid email!</p>}
        </div>

        <div>
          <label style={labelStyle}>Message</label>
          <textarea
            style={{ ...inputStyle, resize: "none" }}
            placeholder="Tell me about your project..."
            maxLength="500"
            name="message"
            required
            onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
            onBlur={(e) => { e.target.style.borderColor = "var(--border-clr)"; checkRequired(); }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            rows="4"
            value={userInput.message}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", paddingTop: "0.5rem" }}>
          {error.required && <p style={{ fontSize: "0.75rem", color: "#ef4444" }}>All fields are required!</p>}
          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={handleSendMail}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Sending...</span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Send Message
                <TbMailForward size={18} />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;