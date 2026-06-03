export function MarqueeStrip() {
  const text = "STRENGTH • DISCIPLINE • TRANSFORMATION • BULLROCKS FITNESS • FORGE YOUR BEST SELF • ";
  
  return (
    <div className="py-6 border-y border-white/10 overflow-hidden flex whitespace-nowrap bg-background">
      <div className="animate-marquee inline-block">
        <span className="text-4xl md:text-6xl font-heading text-white mx-4">{text}</span>
        <span className="text-4xl md:text-6xl font-heading text-white mx-4">{text}</span>
        <span className="text-4xl md:text-6xl font-heading text-white mx-4">{text}</span>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
