import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";
import heroImage from "@assets/generated_images/hero_image_of_diverse_students_learning_in_a_modern_environment.png";

export default function Hero() {
  return (
    <section className="relative bg-brand-blue overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Students learning" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/90 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-brand-gold text-sm font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>Accredited & Non-Accredited Courses</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Accredited & Non-Accredited Courses – <span className="text-brand-gold">Study From Home Today.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Affordable, flexible online courses with job placement support. Start building your future with Umusa Skills Development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Button 
              asChild 
              size="lg" 
              className="bg-brand-gold hover:bg-yellow-500 text-black font-bold text-lg h-14 px-8 rounded-full shadow-lg shadow-yellow-500/20"
            >
              <Link href="/courses">
                Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-brand-blue hover:bg-white hover:text-brand-blue font-bold text-lg h-14 px-8 rounded-full"
            >
              <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
