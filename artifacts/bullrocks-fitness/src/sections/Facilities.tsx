import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  { title: "Strength Training Zone",  desc: "Premium free weights, power racks, and specialized strength equipment.",   img: "/images/facility-strength.png",       tag: "01" },
  { title: "Functional Training",      desc: "Turf area with sleds, battle ropes, and functional fitness rigs.",          img: "/images/facility-functional.png",     tag: "02" },
  { title: "Personal Training",        desc: "1-on-1 expert coaching tailored to your specific goals.",                    img: "/images/facility-personal.png",       tag: "03" },
  { title: "Cardio Area",              desc: "State-of-the-art treadmills, rowers, and assault bikes.",                   img: "/images/facility-cardio.png",         tag: "04" },
  { title: "Transformation Coaching",  desc: "Comprehensive 12-week body transformation programs.",                       img: "/images/facility-transformation.png", tag: "05" },
  { title: "Nutrition Guidance",       desc: "Customized meal plans that fuel your performance.",                         img: "/images/facility-nutrition.png",      tag: "06" },
  { title: "Weight Management",        desc: "Sustainable protocols for lasting body composition changes.",               img: "/images/gym-interior.png",            tag: "07" },
  { title: "Group Sessions",           desc: "High-energy classes that build community and endurance.",                   img: "/images/facility-strength.png",       tag: "08" },
];

export function Facilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal — no pin
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true } }
        );
      }

      // Cards stagger reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".fac-card");
        gsap.fromTo(cards,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true } }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className="py-24 bg-[#050505] overflow-hidden border-y border-white/5"
    >
      {/* Header */}
      <div ref={headingRef} className="container mx-auto px-6 lg:px-12 mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-[#FF4D00] uppercase mb-3">What we offer</p>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.9]">
            WORLD-CLASS{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#FF4D00,#FF7300)" }}>
              FACILITIES
            </span>
          </h2>
        </div>
        <p className="text-white/20 text-xs tracking-widest uppercase hidden md:block">Scroll to explore →</p>
      </div>

      {/* Horizontally scrollable strip — pure CSS, no GSAP pin */}
      <div
        ref={cardsRef}
        className="flex gap-5 pb-4 pl-6 md:pl-12 lg:pl-24 overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        {facilities.map((fac, i) => (
          <div
            key={i}
            data-testid={`facility-card-${i}`}
            className="fac-card w-[280px] md:w-[320px] h-[400px] flex-shrink-0 relative overflow-hidden cursor-pointer"
            style={{ scrollSnapAlign: "start" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Full-bleed image */}
            <img
              src={fac.img}
              alt={fac.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: hovered === i ? "scale(1.08)" : "scale(1)" }}
            />

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{ backgroundColor: "rgba(255,77,0,0.12)", opacity: hovered === i ? 1 : 0 }}
            />

            {/* Number tag */}
            <div className="absolute top-5 left-5 font-stats text-[10px] tracking-[0.3em] text-white/30">{fac.tag}</div>

            {/* Top border reveal */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4D00] to-[#FF7300] transition-transform duration-500 origin-left"
              style={{ transform: hovered === i ? "scaleX(1)" : "scaleX(0)" }}
            />

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3
                className="font-heading text-xl md:text-2xl leading-tight transition-colors duration-300 mb-2"
                style={{ color: hovered === i ? "#FF4D00" : "white" }}
              >
                {fac.title}
              </h3>
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: hovered === i ? "80px" : "0px", opacity: hovered === i ? 1 : 0 }}
              >
                <p className="text-white/40 text-xs leading-relaxed">{fac.desc}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Right padding spacer */}
        <div className="w-6 shrink-0" />
      </div>

      {/* Hide scrollbar for webkit */}
      <style>{`
        #facilities [data-testid^="facility-card"]::-webkit-scrollbar { display: none; }
        #facilities > div:last-of-type::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
