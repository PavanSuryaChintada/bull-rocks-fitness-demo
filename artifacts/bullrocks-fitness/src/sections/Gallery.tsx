import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

const images = [
  { id: 1, class: "col-span-1 row-span-1 bg-gradient-to-br from-neutral-800 to-black" },
  { id: 2, class: "col-span-1 row-span-2 bg-gradient-to-br from-neutral-900 to-primary/20" },
  { id: 3, class: "col-span-2 row-span-1 bg-gradient-to-br from-black to-neutral-800" },
  { id: 4, class: "col-span-1 row-span-1 bg-gradient-to-bl from-primary/10 to-black" },
  { id: 5, class: "col-span-1 row-span-2 bg-gradient-to-tr from-neutral-800 to-black" },
  { id: 6, class: "col-span-1 row-span-1 bg-gradient-to-bl from-black to-neutral-900" },
  { id: 7, class: "col-span-2 row-span-1 bg-gradient-to-t from-primary/5 to-black" },
  { id: 8, class: "col-span-1 row-span-1 bg-gradient-to-r from-neutral-900 to-neutral-800" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-32 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-heading mb-4">
              THE <span className="text-gradient-orange">SANCTUARY</span>
            </h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm">Inside Bullrocks Fitness.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {images.map((img) => (
            <div 
              key={img.id} 
              className={`relative group cursor-pointer overflow-hidden border border-white/5 ${img.class}`}
              onClick={() => setSelectedImage(img.id)}
            >
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 z-10 flex items-center justify-center">
                <Search className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 w-10 h-10 drop-shadow-lg" />
              </div>
              {/* placeholder pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-5xl aspect-video bg-gradient-to-br from-neutral-800 to-black border border-white/10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/10 font-heading text-9xl">
                IMG_{selectedImage}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
