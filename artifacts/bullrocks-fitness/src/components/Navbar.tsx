import { Link } from "wouter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "#about" },
    { name: "FACILITIES", href: "#facilities" },
    { name: "MEMBERSHIP", href: "#membership" },
    { name: "TRAINERS", href: "#trainers" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-heading tracking-wider flex items-center group">
          BULLROCKS<span className="text-primary ml-1 group-hover:scale-125 transition-transform">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-widest hover:text-primary transition-colors uppercase"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="bg-gradient-orange text-white px-6 py-2.5 rounded-none font-bold tracking-wider hover:opacity-90 transition-opacity"
            data-testid="button-join-now-nav"
          >
            JOIN NOW
          </a>
        </nav>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-background z-[60] flex flex-col p-6">
          <div className="flex justify-end">
            <button onClick={() => setMobileOpen(false)} className="text-white p-2">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-4xl font-heading tracking-widest hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
