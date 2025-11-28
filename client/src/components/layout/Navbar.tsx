import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
// Import logo
import logoMain from "@assets/Main Logo_1764333025492.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img 
              src={logoMain} 
              alt="Umusa Skills Development" 
              className="h-16 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-gold",
                  location === link.path ? "text-brand-blue font-bold" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              asChild
              className="bg-brand-gold hover:bg-yellow-500 text-black font-bold rounded-full"
            >
              <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-blue p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-white py-4 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={cn(
                  "text-base font-medium py-2 border-b border-gray-100",
                  location === link.path ? "text-brand-blue font-bold" : "text-gray-600"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              asChild
              className="bg-brand-gold hover:bg-yellow-500 text-black font-bold w-full mt-2"
            >
              <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
