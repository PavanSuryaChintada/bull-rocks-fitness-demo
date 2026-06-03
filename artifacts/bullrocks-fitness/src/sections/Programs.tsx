import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: "fat-loss",
    number: "01",
    title: "FAT LOSS",
    subtitle: "Shred Protocol",
    duration: "8–12 Weeks",
    sessions: "4–5× / week",
    desc: "High-intensity interval training, metabolic conditioning, and precision nutrition to strip fat while protecting muscle.",
    img: "/images/program-fatloss.png",
    tags: ["HIIT", "Metabolic", "Nutrition"],
    featured: false,
  },
  {
    id: "muscle",
    number: "02",
    title: "MUSCLE GAIN",
    subtitle: "Hypertrophy Blueprint",
    duration: "12–16 Weeks",
    sessions: "4–6× / week",
    desc: "Progressive overload programming with periodized strength phases and a precise surplus strategy for maximum growth.",
    img: "/images/barbell.png",
    tags: ["Hypertrophy", "Strength", "Nutrition"],
    featured: false,
  },
  {
    id: "strength",
    number: "03",
    title: "STRENGTH",
    subtitle: "Powerlifting Track",
    duration: "16–20 Weeks",
    sessions: "3–4× / week",
    desc: "Structured periodization targeting squat, bench, and deadlift. Built for those who want to move serious weight.",
    img: "/images/dumbbell.png",
    tags: ["Powerlifting", "Technique", "Peak"],
    featured: false,
  },
  {
    id: "transformation",
    number: "04",
    title: "TRANSFORMATION",
    subtitle: "Total Overhaul",
    duration: "12 Weeks",
    sessions: "5× / week",
    desc: "Our flagship. Strength, conditioning, nutrition coaching, and weekly progress tracking — all in one complete system.",
    img: "/images/gym-interior.png",
    tags: ["Full Body", "Coaching", "Tracking"],
    featured: true,
  },
];

export function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector(".programs-heading"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true } }
      );
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.querySelectorAll(".program-card"),
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 75%", once: true } }
        );
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="py-32 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="programs-heading flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#FF4D00] uppercase mb-4">Train with purpose</p>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.9]">
              OUR{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#FF4D00,#FF7300)" }}>
                PROGRAMS
              </span>
            </h2>
          </div>
          <p className="text-white/30 text-sm max-w-xs leading-relaxed">
            Every program is structured, progressive, and built around your goal — not a one-size-fits-all template.
          </p>
        </div>

        <div className="h-[1px] bg-white/8 mb-12" />

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((prog) => (
            <div
              key={prog.id}
              data-testid={`program-card-${prog.id}`}
              className="program-card relative overflow-hidden cursor-pointer"
              style={{ height: prog.featured ? "560px" : "480px" }}
              onMouseEnter={() => setHovered(prog.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <img
                src={prog.img}
                alt={prog.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{ transform: hovered === prog.id ? "scale(1.08)" : "scale(1)" }}
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-black/50" style={{ opacity: hovered === prog.id ? 0.75 : 0.5, transition: "opacity 0.4s" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Featured badge */}
              {prog.featured && (
                <div className="absolute top-5 right-5 text-white text-[9px] font-bold tracking-[0.25em] px-3 py-1.5 uppercase" style={{ background: "linear-gradient(135deg,#FF4D00,#FF7300)" }}>
                  Most Popular
                </div>
              )}

              {/* Number watermark */}
              <div className="absolute top-4 left-5 font-heading text-6xl text-white/8 leading-none select-none">{prog.number}</div>

              {/* Orange top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4D00] to-[#FF7300] transition-transform duration-500 origin-left"
                style={{ transform: hovered === prog.id ? "scaleX(1)" : "scaleX(0)" }} />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3 transition-all duration-300"
                  style={{ opacity: hovered === prog.id ? 1 : 0, transform: hovered === prog.id ? "translateY(0)" : "translateY(8px)" }}>
                  {prog.tags.map(tag => (
                    <span key={tag} className="text-[9px] uppercase tracking-wider px-2 py-0.5 border text-[#FF4D00]"
                      style={{ backgroundColor: "rgba(255,77,0,0.15)", borderColor: "rgba(255,77,0,0.3)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-[#FF4D00] text-[10px] tracking-[0.3em] uppercase mb-1.5">{prog.subtitle}</p>
                <h3 className="font-heading text-3xl lg:text-4xl text-white mb-3">{prog.title}</h3>

                {/* Desc — revealed on hover */}
                <div className="overflow-hidden transition-all duration-400 ease-out"
                  style={{ maxHeight: hovered === prog.id ? "120px" : "0px", opacity: hovered === prog.id ? 1 : 0 }}>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">{prog.desc}</p>
                  <div className="flex gap-5 text-[10px] text-white/30 uppercase tracking-widest">
                    <span>{prog.duration}</span>
                    <span>{prog.sessions}</span>
                  </div>
                </div>

                <a href="#contact" data-testid={`program-cta-${prog.id}`}
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mt-3 transition-colors duration-300"
                  style={{ color: hovered === prog.id ? "#FF4D00" : "rgba(255,255,255,0.3)" }}>
                  Start this program
                  <span style={{ display: "block", height: "1px", backgroundColor: "currentColor", transition: "width 0.3s", width: hovered === prog.id ? "32px" : "16px" }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
