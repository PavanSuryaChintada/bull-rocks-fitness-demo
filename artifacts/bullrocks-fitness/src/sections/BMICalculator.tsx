import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";

export function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<{bmi: string, category: string, plan: string} | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight) return;

    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmiValue = w / (h * h);
    
    let category = "";
    let plan = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
      plan = "Muscle Building Program + Caloric Surplus Diet";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
      plan = "Strength & Conditioning + Maintenance Diet";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
      plan = "Fat Loss Program + Slight Caloric Deficit";
    } else {
      category = "Obese";
      plan = "Transformation Coaching + Strict Nutrition Guidance";
    }

    setResult({
      bmi: bmiValue.toFixed(1),
      category,
      plan
    });
  };

  return (
    <section className="py-32 bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <Calculator className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-5xl md:text-7xl font-heading mb-4">
            FIND YOUR <span className="text-gradient-orange">PLAN</span>
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Calculate your BMI to get a recommended path.</p>
        </div>

        <div className="bg-card/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 w-full max-w-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-orange" />
          
          <div className="grid md:grid-cols-2 gap-12">
            <form onSubmit={calculateBMI} className="space-y-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-neutral-400 mb-2">Height (cm)</label>
                <input 
                  type="number" 
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g. 175"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-neutral-400 mb-2">Weight (kg)</label>
                <input 
                  type="number" 
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g. 70"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-neutral-400 mb-2">Age</label>
                <input 
                  type="number" 
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="e.g. 25"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-orange text-white font-bold tracking-widest py-4 uppercase hover:opacity-90 transition-opacity"
              >
                Calculate & Get Plan
              </button>
            </form>

            <div className="flex items-center justify-center border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center w-full"
                  >
                    <p className="text-sm tracking-widest uppercase text-neutral-400 mb-2">Your BMI</p>
                    <p className="text-7xl font-stats font-bold text-white mb-2">{result.bmi}</p>
                    <p className={`text-xl font-heading tracking-wider mb-8 ${
                      result.category === 'Normal' ? 'text-green-500' : 'text-primary'
                    }`}>
                      {result.category}
                    </p>
                    
                    <div className="bg-black/50 border border-white/5 p-4 text-left">
                      <p className="text-[10px] tracking-widest uppercase text-neutral-500 mb-2">Recommended Path</p>
                      <p className="text-sm text-white font-medium">{result.plan}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-neutral-600"
                  >
                    <p className="text-sm tracking-widest uppercase mb-4">Awaiting Data</p>
                    <div className="w-24 h-24 mx-auto border-2 border-dashed border-neutral-800 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-stats">?</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
