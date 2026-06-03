import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Storytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
        }
      });

      // Stage 1 -> 2
      tl.to(text1Ref.current, { opacity: 0, scale: 0.5, duration: 1 })
        .fromTo(text2Ref.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1 }, "<")
      
      // Stage 2 -> 3
        .to(text2Ref.current, { opacity: 0, scale: 1.5, duration: 1 })
        .fromTo(text3Ref.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1 }, "<")
      
      // Stage 3 -> 4
        .to(text3Ref.current, { opacity: 0, scale: 2, duration: 1 })
        .fromTo(text4Ref.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1 }, "<");
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-background relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-background to-background opacity-50 pointer-events-none" />
      
      <div ref={text1Ref} className="absolute flex flex-col items-center text-center">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4">You start as</span>
        <h2 className="text-6xl md:text-8xl font-heading text-neutral-600">SKINNY</h2>
      </div>

      <div ref={text2Ref} className="absolute flex flex-col items-center text-center opacity-0">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4">You stay</span>
        <h2 className="text-7xl md:text-9xl font-heading text-neutral-400">CONSISTENT</h2>
      </div>

      <div ref={text3Ref} className="absolute flex flex-col items-center text-center opacity-0">
        <span className="text-muted-foreground uppercase tracking-widest text-sm mb-4">You remain</span>
        <h2 className="text-8xl md:text-[10rem] font-heading text-white">DISCIPLINED</h2>
      </div>

      <div ref={text4Ref} className="absolute flex flex-col items-center text-center opacity-0">
        <span className="text-primary uppercase tracking-widest text-sm mb-4">You become a</span>
        <h2 className="text-[clamp(4rem,15vw,15rem)] leading-none font-heading text-gradient-orange">BULLROCKS<br/>ATHLETE</h2>
      </div>
    </section>
  );
}
