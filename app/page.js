import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/homepage/about";
import Expertise from "./components/homepage/services";
import Projects from "./components/homepage/projects";
import Testimonials from "./components/homepage/testimonials";
import CTASection from "./components/homepage/cta";
import ContactSection from "./components/homepage/contact";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Expertise />
      <Projects />
      {/* <Testimonials /> */}
      <CTASection />
      <ContactSection />
    </div>
  );
}