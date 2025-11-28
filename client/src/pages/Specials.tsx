import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Timer, Gift, BookOpen, Briefcase } from "lucide-react";

export default function Specials() {
  return (
    <Layout>
      <div className="bg-black text-white min-h-screen pt-16 pb-24 relative overflow-hidden">
        {/* Confetti/Sparkle Effect Placeholder */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black z-0" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-2 rounded-full font-bold mb-8 animate-bounce">
            <Timer className="w-5 h-5" />
            <span>Offer Ends Soon!</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold mb-6 font-heading uppercase tracking-tighter">
            Black Friday
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Ultimate Career Starter Pack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-gray-900/80 backdrop-blur p-8 rounded-3xl border border-brand-gold/30">
              <h3 className="text-2xl font-bold text-brand-gold mb-6">What You Get</h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-4 text-lg">
                  <div className="bg-brand-gold/20 p-2 rounded-lg">
                    <Gift className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <span className="font-bold block">Free TEFL Certificate</span>
                    <span className="text-gray-400 text-sm">Internationally recognized accreditation</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-lg">
                  <div className="bg-brand-gold/20 p-2 rounded-lg">
                    <BookOpen className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <span className="font-bold block">R2000 Study Guide Included</span>
                    <span className="text-gray-400 text-sm">Comprehensive materials for success</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-lg">
                  <div className="bg-brand-gold/20 p-2 rounded-lg">
                    <Briefcase className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <span className="font-bold block">Job Placement Assistance</span>
                    <span className="text-gray-400 text-sm">We help you get hired immediately</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-brand-blue p-8 rounded-3xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Total Value</h3>
              <p className="text-5xl font-extrabold text-brand-gold mb-6 line-through opacity-50">R5,500</p>
              <h3 className="text-2xl font-bold text-white mb-2">You Pay Only</h3>
              <p className="text-6xl font-extrabold text-white mb-8">R500</p>
              <Button asChild size="lg" className="w-full bg-brand-gold hover:bg-yellow-400 text-black font-bold h-14 text-xl">
                <Link href="/contact">Claim Now</Link>
              </Button>
              <p className="text-sm text-blue-200 mt-4">*Limited spots available</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
