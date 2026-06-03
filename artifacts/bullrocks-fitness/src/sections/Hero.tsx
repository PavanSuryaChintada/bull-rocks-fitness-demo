import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const prevSlide = useRef(0);
  const slideEls = useRef<(HTMLDivElement | null)[]>([]);
  const imgEls = useRef<(HTMLImageElement | null)[]>([]);
  const rafId = useRef<number>(0);

  // Initialise — show first slide
  useEffect(() => {
    slideEls.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
    });
    imgEls.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.05 });
    });
  }, []);

  // Transition between slides when activeSlide changes
  useEffect(() => {
    const prev = prevSlide.current;
    const curr = activeSlide;
    if (prev === curr) return;

    const prevEl = slideEls.current[prev];
    const currEl = slideEls.current[curr];
    const prevImg = imgEls.current[prev];
    const currImg = imgEls.current[curr];

    if (prevEl) gsap.to(prevEl, { opacity: 0, y: -25, duration: 0.45, ease: "power2.in" });
    if (prevImg) gsap.to(prevImg, { opacity: 0, scale: 0.96, duration: 0.45, ease: "power2.in" });
    if (currEl) gsap.fromTo(currEl, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 });
    if (currImg) gsap.fromTo(currImg, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 });

    prevSlide.current = curr;
  }, [activeSlide]);

  // Drive slide index from scroll position
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const track = scrollTrackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const totalScroll = track.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, scrolled / totalScroll);

        // Update progress bar
        if (progressRef.current) {
          progressRef.current.style.width = `${progress * 100}%`;
        }

        // Map progress to slide index
        const idx = Math.min(
          SLIDES.length - 1,
          Math.floor(progress * SLIDES.length)
        );
        setActiveSlide(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    // Scroll track — tall enough to scroll through all slides
    <div
      ref={scrollTrackRef}
      style={{ height: `${SLIDES.length * 100}vh` }}
      className="relative"
      id="hero"
    >
      {/* Sticky viewport — stays in place while outer div scrolls */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen bg-[#050505] overflow-hidden"
      >
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000_100%)] z-[1] pointer-events-none" />

        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-20">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#FF4D00] to-[#FF7300]"
            style={{ width: "0%", transition: "width 0.1s linear" }}
          />
        </div>

        {/* Right — image stack */}
        <div className="absolute right-0 top-0 w-full md:w-[55%] h-full z-0">
          {SLIDES.map((slide, i) => (
            <img
              key={slide.id}
              ref={(el) => { imgEls.current[i] = el; }}
              src={slide.img}
              alt={slide.equipment}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10" />
        </div>

        {/* Left — text stack */}
        <div className="relative z-10 h-full flex flex-col justify-center pl-8 md:pl-16 lg:pl-24 pr-4 max-w-3xl">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              ref={(el) => { slideEls.current[i] = el; }}
              className="absolute"
              style={{ opacity: 0 }}
            >
              <p className="text-[10px] md:text-xs tracking-[0.4em] text-[#FF4D00] uppercase font-medium mb-6 md:mb-8">
                {slide.label}
              </p>
              <h1 className="font-heading leading-[0.88] m-0 mb-6">
                {slide.title.map((word, wi) => (
                  <span
                    key={wi}
                    className={`block text-[clamp(3.5rem,8vw,9rem)] ${
                      wi === slide.highlight ? "text-transparent bg-clip-text" : "text-white"
                    }`}
                    style={
                      wi === slide.highlight
                        ? { backgroundImage: "linear-gradient(135deg, #FF4D00, #FF7300)" }
                        : {}
                    }
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-sm font-light">
                {slide.sub}
              </p>
              <div className="mt-6 inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#FF4D00]" />
                <span className="text-xs tracking-widest text-white/30 uppercase">{slide.equipment}</span>
              </div>
            </div>
          ))}

          {/* Fixed CTAs */}
          <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 flex flex-wrap gap-4 z-20">
            <a
              href="#contact"
              data-testid="button-join-now"
              className="bg-gradient-to-r from-[#FF4D00] to-[#FF7300] text-white text-xs md:text-sm px-7 py-3.5 font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] transition-shadow duration-300"
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

        {/* Slide dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              data-testid={`dot-slide-${i}`}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: activeSlide === i ? "#FF4D00" : "rgba(255,255,255,0.2)",
                transform: activeSlide === i ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.4em] text-white/20 uppercase rotate-90 origin-center">
            Scroll
          </span>
        </div>
      </div>
    </div>
  );
}
