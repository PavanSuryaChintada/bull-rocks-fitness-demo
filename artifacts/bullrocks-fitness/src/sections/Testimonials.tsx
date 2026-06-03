import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Aakash V.",
    headline: "Lost 20kg in 3 months",
    quote: "I tried commercial gyms for years with zero results. Bullrocks changed everything. The atmosphere forces you to push harder. The trainers actually care about your form and progress.",
    rating: 5
  },
  {
    name: "Deepthi R.",
    headline: "Gained serious strength",
    quote: "As a woman, the free weights section used to intimidate me. The community here is incredibly supportive. Now I'm deadlifting weights I never thought possible.",
    rating: 5
  },
  {
    name: "Suresh P.",
    headline: "Best equipment in Vizag",
    quote: "If you're serious about lifting, this is the only place in Sujathanagar. The equipment is top-tier, maintenance is excellent, and the vibe is purely focused on hard work.",
    rating: 5
  }
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-background border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-heading mb-4">
            SUCCESS <span className="text-gradient-orange">STORIES</span>
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Don't take our word for it.</p>
        </div>

        <div className="max-w-4xl mx-auto relative min-h-[300px]">
          <Quote className="absolute -top-10 -left-10 w-24 h-24 text-white/5 -z-10" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-white/5 p-10 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <h3 className="text-2xl md:text-4xl font-heading text-white mb-6">
                "{testimonials[current].headline}"
              </h3>
              
              <p className="text-lg md:text-xl text-neutral-400 mb-10 italic leading-relaxed">
                {testimonials[current].quote}
              </p>
              
              <div className="inline-block border-t border-primary/50 pt-4">
                <p className="font-bold tracking-widest uppercase">{testimonials[current].name}</p>
                <p className="text-xs text-primary tracking-widest uppercase mt-1">Bullrocks Athlete</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-12 h-1 transition-colors ${i === current ? 'bg-primary' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
