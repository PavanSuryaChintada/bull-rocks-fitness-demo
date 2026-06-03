import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    id: "strength",
    label: "01 — STRENGTH",
    title: ["BUILD", "YOUR", "FOUNDATION"],
    highlight: 2,
    sub: "Heavy iron, perfect form, relentless progress. Every rep is a brick in the wall.",
    img: "/images/dumbbell.png",
    equipment: "Dumbbells",
  },
  {
    id: "power",
    label: "02 — POWER",
    title: ["LOAD", "THE", "BAR"],
    highlight: 1,
    sub: "Barbells don't lie. Your numbers go up or you go home. Simple.",
    img: "/images/barbell.png",
    equipment: "Olympic Barbell",
  },
  {
    id: "conditioning",
    label: "03 — CONDITIONING",
    title: ["FORGE", "YOUR", "ENDURANCE"],
    highlight: 0,
    sub: "Functional strength that carries into every corner of your life.",
    img: "/images/kettlebell.png",
    equipment: "Kettlebells",
  },
  {
    id: "elite",
    label: "04 — ELITE",
    title: ["BECOME", "THE", "ATHLETE"],
    highlight: 2,
    sub: "Full facility. Expert programming. Zero excuses. This is Bullrocks.",
    img: "/images/gym-interior.png",
    equipment: "Full Facility",
  },
];

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // Set initial state — all slides hidden except first
      slidesRef.current.forEach((slide, i) => {
        if (!slide) return;
        gsap.set(slide, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
      });
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.05 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${SLIDES.length * 100}vh`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      SLIDES.forEach((_, i) => {
        if (i === 0) return;
        const prev = slidesRef.current[i - 1];
        const curr = slidesRef.current[i];
        const prevImg = imagesRef.current[i - 1];
        const currImg = imagesRef.current[i];

        tl.to(prev, { opacity: 0, y: -30, duration: 0.5 }, `slide${i}`)
          .to(prevImg, { opacity: 0, scale: 0.95, duration: 0.5 }, `slide${i}`)
          .fromTo(
            curr,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.5 },
            `slide${i}+=0.1`
          )
          .fromTo(
            currImg,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 0.6 },
            `slide${i}+=0.1`
          )
          .addLabel(`slide${i + 1}`);
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="hero"
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000_100%)] z-[1] pointer-events-none" />

      {/* Thin progress line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-20">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#FF4D00] to-[#FF7300] transition-none"
          style={{ width: "0%" }}
        />
      </div>

      {/* Right — Equipment image stack */}
      <div className="absolute right-0 top-0 w-full md:w-[55%] h-full z-0">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.id}
            ref={(el) => { imagesRef.current[i] = el; }}
            src={slide.img}
            alt={slide.equipment}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0 }}
          />
        ))}
        {/* Left fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10" />
      </div>

      {/* Left — Text content stack */}
      <div className="relative z-10 h-full flex flex-col justify-center pl-8 md:pl-16 lg:pl-24 pr-4 max-w-3xl">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => { slidesRef.current[i] = el; }}
            className="absolute"
            style={{ opacity: 0 }}
          >
            {/* Slide label */}
            <p className="text-[10px] md:text-xs tracking-[0.4em] text-[#FF4D00] uppercase font-medium mb-6 md:mb-8">
              {slide.label}
            </p>

            {/* Main headline */}
            <h1 className="font-heading leading-[0.88] m-0 mb-6">
              {slide.title.map((word, wi) => (
                <span
                  key={wi}
                  className={`block text-[clamp(3.5rem,8vw,9rem)] ${
                    wi === slide.highlight
                      ? "text-transparent bg-clip-text"
                      : "text-white"
                  }`}
                  style={
                    wi === slide.highlight
                      ? {
                          backgroundImage:
                            "linear-gradient(135deg, #FF4D00, #FF7300)",
                        }
                      : {}
                  }
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Sub copy */}
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-sm font-light">
              {slide.sub}
            </p>

            {/* Equipment tag */}
            <div className="mt-6 inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#FF4D00]" />
              <span className="text-xs tracking-widest text-white/30 uppercase">
                {slide.equipment}
              </span>
            </div>
          </div>
        ))}

        {/* Fixed CTAs — always visible */}
        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 flex flex-wrap gap-4 z-20">
          <a
            href="#contact"
            data-testid="button-join-now"
            className="group relative overflow-hidden bg-gradient-to-r from-[#FF4D00] to-[#FF7300] text-white text-xs md:text-sm px-7 py-3.5 font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,77,0,0.4)]"
          >
            JOIN NOW
          </a>
          <a
            href="#trainers"
            data-testid="button-book-training"
            className="text-white text-xs md:text-sm px-7 py-3.5 font-bold tracking-[0.2em] uppercase border border-white/20 hover:border-white/60 transition-colors duration-300"
          >
            BOOK TRAINING
          </a>
        </div>
      </div>

      {/* Slide dots — right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            data-testid={`dot-slide-${i}`}
            className="w-1 h-1 rounded-full bg-white/20 hover:bg-[#FF4D00] transition-colors duration-300"
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.4em] text-white/20 uppercase rotate-90 origin-center">
          Scroll
        </span>
      </div>
    </section>
  );
}
