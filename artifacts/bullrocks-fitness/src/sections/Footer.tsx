import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black relative overflow-hidden border-t-2 border-primary pt-24 pb-8">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[20vw] font-heading leading-none whitespace-nowrap text-white">BULLROCKS</h2>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <h3 className="text-4xl font-heading tracking-wider mb-6">BULLROCKS<span className="text-primary">.</span></h3>
            <p className="text-neutral-500 max-w-sm">
              The premier strength and conditioning facility in Vizag. We don't just change bodies; we forge mindsets. Join the elite.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold tracking-widest text-white uppercase text-sm mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-neutral-500 hover:text-primary transition-colors text-sm uppercase tracking-wider">About Us</a></li>
              <li><a href="#facilities" className="text-neutral-500 hover:text-primary transition-colors text-sm uppercase tracking-wider">Facilities</a></li>
              <li><a href="#membership" className="text-neutral-500 hover:text-primary transition-colors text-sm uppercase tracking-wider">Membership</a></li>
              <li><a href="#trainers" className="text-neutral-500 hover:text-primary transition-colors text-sm uppercase tracking-wider">Trainers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold tracking-widest text-white uppercase text-sm mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-sm tracking-widest uppercase">
            © 2025 Bullrocks Fitness. Forged in Vizag.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-600 hover:text-white transition-colors text-xs tracking-widest uppercase">Privacy Policy</a>
            <a href="#" className="text-neutral-600 hover:text-white transition-colors text-xs tracking-widest uppercase">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
