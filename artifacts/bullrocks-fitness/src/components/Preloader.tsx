import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          data-testid="preloader"
        >
          <div className="overflow-hidden">
            <motion.h1 
              className="text-white text-5xl md:text-8xl font-heading tracking-widest uppercase"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <span className="text-gradient-orange">BULLROCKS</span> FITNESS
            </motion.h1>
          </div>
          
          <motion.div 
            className="h-[2px] bg-white/20 w-64 mt-8 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="absolute inset-y-0 left-0 bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground mt-4 tracking-[0.3em] text-sm uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Stronger Every Day
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
