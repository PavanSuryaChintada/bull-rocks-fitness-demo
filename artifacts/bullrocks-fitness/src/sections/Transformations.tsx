import { useRef } from "react";
import gsap from "gsap";

const transformations = [
  { name: "Rahul S.", stat: "Lost 18kg in 4 months", before: "bg-neutral-800", after: "bg-neutral-600" },
  { name: "Ananya P.", stat: "Gained 5kg muscle mass", before: "bg-neutral-800", after: "bg-neutral-600" },
  { name: "Vikram K.", stat: "Dropped 12% body fat", before: "bg-neutral-800", after: "bg-neutral-600" },
  { name: "Sneha M.", stat: "Lost 22kg in 6 months", before: "bg-neutral-800", after: "bg-neutral-600" },
  { name: "Arjun T.", stat: "Powerlifting total +150kg", before: "bg-neutral-800", after: "bg-neutral-600" },
  { name: "Meera D.", stat: "Lost 15kg postpartum", before: "bg-neutral-800", after: "bg-neutral-600" }
];

export function Transformations() {
  return (
    <section className="py-32 bg-background overflow-hidden flex flex-col items-center border-y border-white/5">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-heading mb-4">
          REAL RESULTS. <span className="text-gradient-orange">REAL PEOPLE.</span>
        </h2>
        <p className="text-muted-foreground uppercase tracking-widest text-sm">The proof is in the work.</p>
      </div>

      <div className="w-full relative py-10 rotate-[-2deg] scale-110">
        {/* Row 1 - Left */}
        <div className="flex gap-6 w-max animate-[scroll-left_30s_linear_infinite] hover:[animation-play-state:paused] mb-6">
          {[...transformations, ...transformations].map((t, i) => (
            <div key={`r1-${i}`} className="w-[400px] bg-card p-4 border border-white/5 group hover:border-primary/50 transition-colors">
              <div className="flex h-[250px] gap-1 mb-4 relative">
                <div className={`flex-1 ${t.before} relative overflow-hidden flex items-end p-2`}>
                  <span className="absolute top-2 left-2 text-[10px] bg-black/50 px-2 py-1 uppercase tracking-widest">Before</span>
                </div>
                <div className={`flex-1 ${t.after} relative overflow-hidden flex items-end p-2`}>
                  <span className="absolute top-2 right-2 text-[10px] bg-primary/80 px-2 py-1 uppercase tracking-widest text-white">After</span>
                </div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-orange -translate-x-1/2 shadow-[0_0_10px_rgba(255,77,0,0.5)]" />
              </div>
              <div className="flex justify-between items-center">
                <h4 className="font-heading text-xl">{t.name}</h4>
                <span className="text-primary text-sm font-bold">{t.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - Right */}
        <div className="flex gap-6 w-max animate-[scroll-right_30s_linear_infinite] hover:[animation-play-state:paused] ml-[-400px]">
          {[...transformations, ...transformations].reverse().map((t, i) => (
            <div key={`r2-${i}`} className="w-[400px] bg-card p-4 border border-white/5 group hover:border-primary/50 transition-colors">
              <div className="flex h-[250px] gap-1 mb-4 relative">
                <div className={`flex-1 ${t.before} relative overflow-hidden flex items-end p-2`}>
                  <span className="absolute top-2 left-2 text-[10px] bg-black/50 px-2 py-1 uppercase tracking-widest">Before</span>
                </div>
                <div className={`flex-1 ${t.after} relative overflow-hidden flex items-end p-2`}>
                  <span className="absolute top-2 right-2 text-[10px] bg-primary/80 px-2 py-1 uppercase tracking-widest text-white">After</span>
                </div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-orange -translate-x-1/2 shadow-[0_0_10px_rgba(255,77,0,0.5)]" />
              </div>
              <div className="flex justify-between items-center">
                <h4 className="font-heading text-xl">{t.name}</h4>
                <span className="text-primary text-sm font-bold">{t.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
