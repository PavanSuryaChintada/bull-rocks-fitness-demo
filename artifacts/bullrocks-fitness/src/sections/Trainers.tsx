import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: "RAVI KUMAR",
    role: "Head Strength Coach",
    tags: ["Powerlifting", "Hypertrophy", "Biomechanics"],
    certifications: ["CSCS Certified", "ISSA Certified", "8+ Years Experience"],
    quote: "Excuses don't build muscle.",
    img: "/images/trainer-1.png",
  },
  {
    name: "PRIYA SHARMA",
    role: "Transformation Specialist",
    tags: ["Fat Loss", "Nutrition", "HIIT"],
    certifications: ["Precision Nutrition L2", "CrossFit L1", "5+ Years Experience"],
    quote: "Discipline is choosing what you want most over what you want now.",
    img: "/images/trainer-2.png",
  },
  {
    name: "KIRAN REDDY",
    role: "Functional Fitness Coach",
    tags: ["Mobility", "Athletic Performance", "Rehab"],
    certifications: ["FMS L2", "NASM-CPT", "6+ Years Experience"],
    quote: "Movement is medicine. Let's build a resilient body.",
    img: "/images/trainer-3.png",
  },
];

export function Trainers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current!.querySelectorAll(".trainer-card"),
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%", once: true },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="trainers" ref={containerRef} className="py-32 bg-[#050505] border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#FF4D00] uppercase mb-4">Expert coaches</p>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.9]">
              YOUR{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#FF4D00,#FF7300)" }}>
                COACHES
              </span>
            </h2>
          </div>
          <a href="#contact" data-testid="link-view-all-trainers" className="text-xs tracking-[0.3em] uppercase text-[#FF4D00] border-b border-[#FF4D00]/50 pb-1 hover:border-[#FF4D00] transition-colors">
            Book a session →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {trainers.map((trainer, i) => (
            <div
              key={i}
              className="trainer-card"
              style={{ perspective: "1000px", height: "520px" }}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
            >
              {/* Inner flip container — pure CSS, no direct DOM manipulation */}
              <div
                style={{
                  position: "relative", width: "100%", height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
                  transform: flipped === i ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT */}
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", overflow: "hidden" }}>
                  <img src={trainer.img} alt={trainer.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4D00] to-[#FF7300]" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <h3 className="font-heading text-3xl text-white mb-1">{trainer.name}</h3>
                    <p className="text-[#FF4D00] text-[10px] tracking-[0.3em] uppercase mb-5">{trainer.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {trainer.tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase tracking-wider px-2.5 py-1 bg-white/10 border border-white/10 text-white/60">{tag}</span>
                      ))}
                    </div>
                    <p className="text-white/25 text-[10px] mt-4 tracking-widest uppercase">Hover for credentials</p>
                  </div>
                </div>

                {/* BACK */}
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: "#111", borderLeft: "1px solid rgba(255,77,0,0.2)", borderRight: "1px solid rgba(255,77,0,0.2)", borderBottom: "1px solid rgba(255,77,0,0.2)" }}>
                  <div className="h-full flex flex-col justify-between p-8">
                    <div>
                      <div className="w-8 h-[2px] bg-[#FF4D00] mb-6" />
                      <h3 className="font-heading text-2xl text-white mb-1">{trainer.name}</h3>
                      <p className="text-[#FF4D00] text-[10px] tracking-[0.3em] uppercase mb-8">{trainer.role}</p>
                      <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Credentials</p>
                      <ul className="space-y-3 mb-8">
                        {trainer.certifications.map(cert => (
                          <li key={cert} className="flex items-center gap-3 text-sm text-white/70">
                            <span className="w-4 h-[1px] bg-[#FF4D00] shrink-0" />{cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <blockquote className="italic text-white/40 text-sm leading-relaxed border-l-2 border-[#FF4D00] pl-4 mb-8">
                        "{trainer.quote}"
                      </blockquote>
                      <a
                        href="#contact"
                        data-testid={`button-book-trainer-${i}`}
                        className="block w-full py-3.5 text-center font-bold tracking-[0.2em] text-xs uppercase hover:opacity-90 transition-opacity"
                        style={{ background: "linear-gradient(135deg,#FF4D00,#FF7300)", color: "white" }}
                      >
                        Book Free Consultation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
