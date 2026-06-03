import { useEffect, useRef } from "react";
import gsap from "gsap";

const STAGES = [
  { label: "You start as", word: "SKINNY",       color: "text-neutral-600",  size: "text-6xl md:text-8xl" },
  { label: "You stay",     word: "CONSISTENT",   color: "text-neutral-400",  size: "text-7xl md:text-9xl" },
  { label: "You remain",   word: "DISCIPLINED",  color: "text-white",        size: "text-8xl md:text-[10rem]" },
  { label: "You become a", word: "BULLROCKS\nATHLETE", color: "text-gradient-orange", size: "text-[clamp(3.5rem,12vw,12rem)]", gradient: true },
];

export function Storytelling() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const stageEls = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number>(0);
  const currentStage = useRef(-1);

  useEffect(() => {
    // Hide all stages initially
    stageEls.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, scale: 0.6 });
    });

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const track = scrollTrackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const totalScroll = track.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, scrolled / totalScroll);

        const idx = Math.min(
          STAGES.length - 1,
          Math.floor(progress * STAGES.length)
        );

        if (idx === currentStage.current) return;

        // Fade out old
        if (currentStage.current >= 0) {
          const prevEl = stageEls.current[currentStage.current];
          if (prevEl) {
            gsap.to(prevEl, {
              opacity: 0,
              scale: currentStage.current < idx ? 1.5 : 0.6,
              duration: 0.5,
              ease: "power2.in",
            });
          }
        }

        // Fade in new
        const newEl = stageEls.current[idx];
        if (newEl) {
          gsap.fromTo(
            newEl,
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.15 }
          );
        }

        currentStage.current = idx;
      });
    };

    // Trigger once to show first stage if already scrolled
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    // Scroll track — 400vh tall
    <div ref={scrollTrackRef} style={{ height: "500vh" }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen bg-background relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-background to-background opacity-50 pointer-events-none" />

        {STAGES.map((stage, i) => (
          <div
            key={i}
            ref={(el) => { stageEls.current[i] = el; }}
            className="absolute flex flex-col items-center text-center px-6"
            style={{ opacity: 0 }}
          >
            <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4">
              {stage.label}
            </span>
            {stage.gradient ? (
              <h2
                className={`${stage.size} leading-none font-heading text-gradient-orange`}
                style={{ whiteSpace: "pre-line" }}
              >
                {stage.word}
              </h2>
            ) : (
              <h2 className={`${stage.size} font-heading ${stage.color}`}>
                {stage.word}
              </h2>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
