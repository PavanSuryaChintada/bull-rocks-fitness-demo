import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { Storytelling } from "@/sections/Storytelling";
import { About } from "@/sections/About";
import { WhyUs } from "@/sections/WhyUs";
import { Facilities } from "@/sections/Facilities";
import { Programs } from "@/sections/Programs";
import { Membership } from "@/sections/Membership";
import { Trainers } from "@/sections/Trainers";
import { Transformations } from "@/sections/Transformations";
import { BMICalculator } from "@/sections/BMICalculator";
import { Testimonials } from "@/sections/Testimonials";
import { Gallery } from "@/sections/Gallery";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

import Lenis from "lenis";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
      <Preloader />
      <CustomCursor />
      <Navbar />

      <Hero />
      <MarqueeStrip />
      <Storytelling />
      <About />
      <WhyUs />
      <Facilities />
      <Programs />
      <Membership />
      <Trainers />
      <Transformations />
      <BMICalculator />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
