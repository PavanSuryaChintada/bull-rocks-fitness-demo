import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dumbbell, Activity, HeartPulse, Flame, Scale, Apple, ShieldCheck, Target, Users, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  { icon: Dumbbell, title: "Strength Training Zone", desc: "Premium free weights, power racks, and specialized strength equipment." },
  { icon: Activity, title: "Functional Training", desc: "Turf area with sleds, battle ropes, and functional fitness rigs." },
  { icon: ShieldCheck, title: "Personal Training", desc: "1-on-1 expert coaching tailored to your specific goals." },
  { icon: HeartPulse, title: "Cardio Area", desc: "State-of-the-art treadmills, rowers, and assault bikes." },
  { icon: Target, title: "Transformation Coaching", desc: "Comprehensive 12-week body transformation programs." },
  { icon: Apple, title: "Nutrition Guidance", desc: "Customized meal plans that fuel your performance." },
  { icon: Scale, title: "Weight Management", desc: "Sustainable protocols for lasting body composition changes." },
  { icon: Zap, title: "Muscle Building", desc: "Hypertrophy-specific programming for maximum gains." },
  { icon: Flame, title: "Fat Loss Programs", desc: "High-intensity protocols designed to shred body fat." },
  { icon: Users, title: "Group Sessions", desc: "High-energy classes that build community and endurance." },
];

export function Facilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    // Set up horizontal scroll
    const ctx = gsap.context(() => {
      const scrollWidth = scrollWrapperRef.current!.scrollWidth - window.innerWidth;
      
      gsap.to(scrollWrapperRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      translateZ: 50,
      boxShadow: "0 20px 40px rgba(255, 77, 0, 0.1)",
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section id="facilities" ref={containerRef} className="bg-neutral-950 overflow-hidden h-screen flex flex-col justify-center border-y border-white/5">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-5xl md:text-7xl font-heading">
          WORLD-CLASS <span className="text-gradient-orange">FACILITIES</span>
        </h2>
      </div>
      
      <div className="pl-6 md:pl-[max(1.5rem,calc((100vw-1536px)/2))]">
        <div ref={scrollWrapperRef} className="flex gap-6 pb-12 w-max px-6">
          {facilities.map((fac, i) => (
            <div 
              key={i}
              className="w-[300px] h-[400px] bg-card border border-white/5 p-8 flex flex-col justify-between group perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-16 h-16 rounded-full bg-background border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                <fac.icon className="w-8 h-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-2xl font-heading mb-4 group-hover:text-primary transition-colors">{fac.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{fac.desc}</p>
              </div>
              
              <div className="w-full h-1 bg-white/5 mt-6 group-hover:bg-gradient-orange transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
