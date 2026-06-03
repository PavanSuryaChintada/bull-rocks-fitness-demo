import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "BASIC",
    price: "₹ ---/mo",
    features: ["Gym Access", "Cardio Equipment", "Strength Equipment", "Locker Room Access"],
    popular: false
  },
  {
    name: "ELITE",
    price: "₹ ---/mo",
    features: ["Personal Training", "Customized Workout Plan", "Transformation Tracking", "Nutrition Plan", "Priority Support"],
    popular: true
  },
  {
    name: "PRO",
    price: "₹ ---/mo",
    features: ["Everything in Basic", "Trainer Support", "Diet Guidance", "Group Classes"],
    popular: false
  }
];

export function Membership() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = containerRef.current.querySelectorAll('.pricing-card');
    
    gsap.fromTo(cards, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section id="membership" ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-heading mb-4">
            CHOOSE YOUR <span className="text-gradient-orange">WEAPON</span>
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Commit to the process.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`pricing-card relative bg-card/40 backdrop-blur-md border p-8 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${
                plan.popular 
                  ? "border-primary/50 shadow-[0_0_30px_rgba(255,77,0,0.15)] md:py-12" 
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-orange text-white text-xs font-bold px-4 py-1 tracking-widest uppercase shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-3xl font-heading tracking-wider mb-2">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-4xl font-stats font-bold">{plan.price}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-neutral-300">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="#contact"
                className={`block w-full py-4 text-center font-bold tracking-widest transition-all ${
                  plan.popular
                    ? "bg-gradient-orange text-white hover:shadow-[0_0_20px_rgba(255,77,0,0.4)]"
                    : "bg-white/5 border border-white/10 hover:bg-white hover:text-black"
                }`}
              >
                SELECT PLAN
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
