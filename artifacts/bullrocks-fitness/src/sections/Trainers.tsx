import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    name: "RAVI KUMAR",
    role: "Head Strength Coach",
    tags: ["Powerlifting", "Hypertrophy", "Biomechanics"],
    certifications: ["CSCS", "ISSA Certified", "8+ Years Experience"],
    quote: "Excuses don't build muscle."
  },
  {
    name: "PRIYA SHARMA",
    role: "Transformation Specialist",
    tags: ["Fat Loss", "Nutrition", "HIIT"],
    certifications: ["Precision Nutrition L2", "CrossFit L1", "5+ Years Experience"],
    quote: "Discipline is choosing between what you want now and what you want most."
  },
  {
    name: "KIRAN REDDY",
    role: "Functional Fitness Coach",
    tags: ["Mobility", "Athletic Performance", "Rehab"],
    certifications: ["FMS L2", "NASM-CPT", "6+ Years Experience"],
    quote: "Movement is medicine. Let's build a resilient body."
  }
];

export function Trainers() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.trainer-card'),
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section id="trainers" ref={containerRef} className="py-32 bg-neutral-950 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-heading mb-4">
              YOUR <span className="text-gradient-orange">COACHES</span>
            </h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm">Guided by the best in Vizag.</p>
          </div>
          <a href="#contact" className="border-b border-primary text-primary hover:text-white hover:border-white transition-colors uppercase tracking-widest pb-1 text-sm font-bold">
            View All Trainers
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <div key={i} className="trainer-card group perspective-1000 h-[500px]">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-card border border-white/10 flex flex-col justify-end p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  
                  {/* Placeholder gradient instead of image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 z-0" />
                  
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-20">
                    <h3 className="text-4xl font-heading mb-1">{trainer.name}</h3>
                    <p className="text-primary tracking-widest text-xs uppercase mb-4">{trainer.role}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {trainer.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-neutral-900 border border-primary/30 p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-heading mb-6 text-primary">CREDENTIALS</h4>
                    <ul className="space-y-3">
                      {trainer.certifications.map(cert => (
                        <li key={cert} className="text-sm text-neutral-300 flex items-start gap-2">
                          <span className="text-primary mt-1">•</span> {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="italic text-neutral-400 text-sm mb-6 border-l-2 border-primary pl-4">
                      "{trainer.quote}"
                    </p>
                    <a href="#contact" className="block w-full py-3 text-center bg-white/5 border border-white/10 hover:bg-gradient-orange hover:border-transparent transition-all uppercase tracking-widest text-xs font-bold">
                      Book Consultation
                    </a>
                  </div>
                </div>
                
              </div>
              
              <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
