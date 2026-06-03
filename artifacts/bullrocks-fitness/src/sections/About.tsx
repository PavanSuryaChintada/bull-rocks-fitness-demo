import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!statsRef.current) return;
    
    const counters = statsRef.current.querySelectorAll('.stat-counter');
    
    const ctx = gsap.context(() => {
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        
        gsap.to(counter, {
          innerHTML: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        });
      });
    }, statsRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-auto md:h-[600px] bg-gradient-to-br from-neutral-900 to-black border border-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            <div className="absolute bottom-8 left-8">
              <p className="font-heading text-4xl text-white/50">EST. 2019</p>
              <p className="text-primary tracking-widest text-sm uppercase">Vizag, India</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-5xl md:text-7xl font-heading mb-8">
              FORGED IN <span className="text-gradient-orange">VIZAG</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Bullrocks isn't a wellness spa. It's a sanctuary for those who understand that growth requires friction. Located in the heart of Sujathanagar, Anakapalli region, we've built more than a gym — we've forged a community of the relentlessly dedicated.
              </p>
              <p>
                We strip away the gimmicks and focus on what works: heavy iron, expert coaching, and an atmosphere that demands your absolute best. Whether you're lifting for the first time or prepping for a meet, the standard remains the same.
              </p>
            </div>
            
            <div ref={statsRef} className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <p className="text-5xl font-stats font-bold text-primary mb-2">
                  <span className="stat-counter" data-target="2000">0</span>+
                </p>
                <p className="text-sm tracking-wider uppercase text-white/70">Members</p>
              </div>
              <div>
                <p className="text-5xl font-stats font-bold text-primary mb-2">
                  <span className="stat-counter" data-target="100">0</span>+
                </p>
                <p className="text-sm tracking-wider uppercase text-white/70">Transformations</p>
              </div>
              <div>
                <p className="text-5xl font-stats font-bold text-primary mb-2">
                  <span className="stat-counter" data-target="5">0</span>+
                </p>
                <p className="text-sm tracking-wider uppercase text-white/70">Years Excellence</p>
              </div>
              <div>
                <p className="text-5xl font-stats font-bold text-primary mb-2">
                  <span className="stat-counter" data-target="24">0</span>/7
                </p>
                <p className="text-sm tracking-wider uppercase text-white/70">Motivation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
