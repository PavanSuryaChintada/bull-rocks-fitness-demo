import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 2000, suffix: "+", label: "Members", is247: false },
  { value: 100, suffix: "+", label: "Transformations", is247: false },
  { value: 5, suffix: "+", label: "Years Excellence", is247: false },
  { value: 24, suffix: "", label: "Hours Open", is247: true },
];

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animations
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-counter");
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target") || "0");
          gsap.fromTo(
            counter,
            { innerHTML: 0 },
            {
              innerHTML: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerHTML: 1 },
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        });
      }

      // Image reveal
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current.querySelector(".about-image"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="about-image relative aspect-[4/5] overflow-hidden">
              <img
                src="/images/gym-interior.png"
                alt="Bullrocks Fitness facility"
                className="w-full h-full object-cover"
              />
              {/* Overlay grid */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #050505 0%, transparent 40%)",
                }}
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#111] border border-white/10 p-6 hidden md:block">
              <p className="font-heading text-5xl text-[#FF4D00] leading-none">EST.</p>
              <p className="font-heading text-5xl text-white leading-none">2019</p>
              <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mt-2">
                Vizag, India
              </p>
            </div>

            {/* Thin orange left border accent */}
            <div className="absolute -left-3 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[#FF4D00] to-transparent hidden lg:block" />
          </div>

          {/* Text side */}
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#FF4D00] uppercase mb-5">
              About Bullrocks
            </p>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8">
              FORGED IN{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF4D00, #FF7300)",
                }}
              >
                VIZAG
              </span>
            </h2>

            <div className="space-y-5 text-white/50 text-base leading-relaxed">
              <p>
                Bullrocks isn't a wellness spa. It's a sanctuary for those who
                understand that growth requires friction. Located in the heart
                of Sujathanagar, Anakapalli region, we've built more than a
                gym — we've forged a community of the relentlessly dedicated.
              </p>
              <p>
                We strip away the gimmicks and focus on what works: heavy iron,
                expert coaching, and an atmosphere that demands your absolute
                best. Whether you're lifting for the first time or prepping for
                a meet, the standard here remains unchanged.
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-[1px] bg-[#FF4D00] my-10" />

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-x-8 gap-y-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-stats font-bold text-4xl lg:text-5xl text-white leading-none mb-1">
                    <span
                      className="stat-counter text-transparent bg-clip-text"
                      data-target={stat.value}
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #FF4D00, #FF7300)",
                      }}
                    >
                      0
                    </span>
                    {stat.is247 ? (
                      <span
                        className="text-transparent bg-clip-text"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #FF4D00, #FF7300)",
                        }}
                      >
                        /7
                      </span>
                    ) : (
                      <span
                        className="text-transparent bg-clip-text"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #FF4D00, #FF7300)",
                        }}
                      >
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                  <p className="text-xs tracking-[0.25em] uppercase text-white/30">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
