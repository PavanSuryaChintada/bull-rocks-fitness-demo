import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    number: "01",
    title: "Expert Coaches Only",
    desc: "Every trainer holds internationally recognized certifications. We don't hire hobbyists — we hire obsessives.",
  },
  {
    number: "02",
    title: "No Fluff Programming",
    desc: "Your workouts are periodized, tracked, and adjusted every week based on real data — not gut feelings.",
  },
  {
    number: "03",
    title: "Proven Transformations",
    desc: "100+ documented transformations since 2019. Before/after isn't a marketing trick here — it's a standard outcome.",
  },
  {
    number: "04",
    title: "Community That Pushes You",
    desc: "Your training partners will pull you to levels you won't reach alone. That's not motivation — that's physics.",
  },
];

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        section.querySelector(".whyus-heading"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );

      // Big background text
      gsap.fromTo(
        section.querySelector(".bg-text"),
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );

      // Reason rows animate in with stagger
      const rows = section.querySelectorAll(".reason-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              once: true,
            },
            delay: i * 0.05,
          }
        );
      });

      // Lines grow in
      const lines = section.querySelectorAll(".reason-line");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="py-32 bg-[#0A0A0A] border-t border-white/5 overflow-hidden relative"
    >
      {/* Large background text */}
      <div
        className="bg-text absolute right-0 top-1/2 -translate-y-1/2 font-heading text-[18vw] text-white/[0.02] leading-none select-none pointer-events-none whitespace-nowrap"
        aria-hidden
      >
        BULLROCKS
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="whyus-heading mb-20">
          <p className="text-[10px] tracking-[0.4em] text-[#FF4D00] uppercase mb-4">
            Why choose us
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.9] shrink-0">
              THE BULLROCKS{" "}
              <span
                className="text-transparent bg-clip-text block"
                style={{ backgroundImage: "linear-gradient(135deg,#FF4D00,#FF7300)" }}
              >
                DIFFERENCE
              </span>
            </h2>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              Most gyms sell equipment access. We sell results. Here's what actually separates us from every other gym in Vizag.
            </p>
          </div>
        </div>

        {/* Reasons */}
        <div className="space-y-0">
          {reasons.map((r, i) => (
            <div key={r.number}>
              <div
                className="reason-line h-[1px] bg-white/8 origin-left"
                style={{ transformOrigin: "left" }}
              />
              <div className="reason-row group flex flex-col md:flex-row md:items-center gap-6 py-10 cursor-default hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4">
                {/* Number */}
                <span className="font-stats text-xs text-white/20 tracking-widest w-10 shrink-0">
                  {r.number}
                </span>

                {/* Title */}
                <h3 className="font-heading text-2xl md:text-3xl text-white group-hover:text-[#FF4D00] transition-colors duration-300 md:w-64 shrink-0">
                  {r.title}
                </h3>

                {/* Expanding line */}
                <div className="hidden md:block flex-1">
                  <div className="h-[1px] bg-white/10 group-hover:bg-[#FF4D00]/30 transition-colors duration-500" />
                </div>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed md:w-80 shrink-0 group-hover:text-white/60 transition-colors duration-300">
                  {r.desc}
                </p>

                {/* Arrow */}
                <span className="text-white/20 group-hover:text-[#FF4D00] transition-colors duration-300 text-xl shrink-0 hidden md:block">
                  →
                </span>
              </div>
            </div>
          ))}
          <div className="reason-line h-[1px] bg-white/8 origin-left" style={{ transformOrigin: "left" }} />
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="font-heading text-3xl md:text-4xl text-white leading-tight">
              Ready to stop making excuses?
            </p>
            <p className="text-white/30 text-sm mt-2">
              First consultation is always free.
            </p>
          </div>
          <a
            href="#contact"
            data-testid="button-why-us-cta"
            className="inline-block bg-gradient-to-r from-[#FF4D00] to-[#FF7300] text-white font-bold tracking-[0.2em] text-xs uppercase px-10 py-4 hover:shadow-[0_0_40px_rgba(255,77,0,0.35)] transition-shadow duration-300 shrink-0"
          >
            Start For Free
          </a>
        </div>
      </div>
    </section>
  );
}
