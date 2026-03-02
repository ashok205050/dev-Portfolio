import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import GravityCursorWrapper from "./components/helper/gravity-cursor-wrapper";
import "./css/card.scss";
import "./css/globals.scss";

export const metadata = {
  title: "Ashok Maurya — Fullstack Developer",
  description: "Portfolio of Ashok Maurya. Fullstack developer building modern web applications with React, Next.js, Node.js, and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <GravityCursorWrapper />
        <ToastContainer position="bottom-right" theme="dark" toastStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#f5f0e8" }} />
        <Navbar />
        <main style={{ position: "relative", zIndex: 2 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}