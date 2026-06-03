import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";

export function Contact() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  
  const goals = ["Weight Loss", "Muscle Gain", "Transformation", "General Fitness"];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <section id="contact" className="py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-5xl md:text-7xl font-heading mb-4">
              START YOUR <span className="text-gradient-orange">JOURNEY</span> TODAY
            </h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm mb-12">Take the first step.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold tracking-widest text-white uppercase text-sm mb-1">Location</h4>
                  <p className="text-neutral-400">Bullrocks Fitness<br/>Sujathanagar / Anakapalli<br/>Visakhapatnam, AP, India</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-primary w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold tracking-widest text-white uppercase text-sm mb-1">Hours</h4>
                  <p className="text-neutral-400">Monday - Saturday: 5:00 AM - 10:00 PM<br/>Sunday: 6:00 AM - 12:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-primary w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold tracking-widest text-white uppercase text-sm mb-1">Contact</h4>
                  <p className="text-neutral-400">+91 XXXXX XXXXX</p>
                  <a href="#" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors mt-2 text-sm font-medium">
                    <FaWhatsapp className="w-5 h-5" /> Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-white/10 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
              <div 
                className="h-full bg-gradient-orange transition-all duration-500" 
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            
            <div className="flex gap-2 mb-8 mt-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-2 flex-1 ${i <= step ? 'bg-primary' : 'bg-white/10'}`} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-heading mb-6">WHAT IS YOUR PRIMARY GOAL?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {goals.map(g => (
                      <button
                        key={g}
                        onClick={() => { setGoal(g); setStep(2); }}
                        className={`p-6 border text-left transition-all ${
                          goal === g 
                            ? 'border-primary bg-primary/10 text-white' 
                            : 'border-white/10 bg-black/50 text-neutral-400 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <span className="font-bold tracking-widest uppercase text-xs block">{g}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-heading">YOUR DETAILS</h3>
                    <button type="button" onClick={() => setStep(1)} className="text-xs text-primary uppercase tracking-widest">Back</button>
                  </div>
                  
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-neutral-400 mb-2">Full Name</label>
                    <input type="text" required className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-neutral-400 mb-2">WhatsApp Number</label>
                    <input type="tel" required className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-neutral-400 mb-2">Email Address</label>
                    <input type="email" required className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  
                  <button type="submit" className="w-full bg-gradient-orange text-white font-bold tracking-widest py-4 uppercase hover:opacity-90 transition-opacity mt-4">
                    Submit Request
                  </button>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
                  <h3 className="text-4xl font-heading mb-4">REQUEST RECEIVED</h3>
                  <p className="text-neutral-400">
                    We've received your request for <strong>{goal}</strong>. Our team will contact you via WhatsApp within 24 hours to schedule your free consultation.
                  </p>
                  <button onClick={() => {setStep(1); setGoal("");}} className="mt-8 text-xs text-primary border-b border-primary pb-1 uppercase tracking-widest">
                    Start Over
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}
