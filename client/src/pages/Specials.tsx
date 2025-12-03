import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Timer, Gift, Bell, Star } from "lucide-react";

export default function Specials() {
  return (
    <Layout>
      <div className="bg-black text-white min-h-screen pt-16 pb-24 relative overflow-hidden">
        {/* Confetti/Sparkle Effect Placeholder */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black z-0" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-2 rounded-full font-bold mb-8 animate-bounce">
            <Timer className="w-5 h-5" />
            <span>Limited Time Offers</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold mb-6 font-heading uppercase tracking-tighter">
            Monthly Specials
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-12 max-w-3xl mx-auto">
            We regularly update this page with exclusive deals on our accredited and non-accredited courses.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-gray-900/80 backdrop-blur p-8 rounded-3xl border border-brand-gold/30 flex flex-col justify-center items-center text-center h-full">
              <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Stay Tuned!</h3>
              <p className="text-gray-400 mb-6">
                Our next big special is coming soon. Don't miss out on the chance to upgrade your skills for less.
              </p>
              <Button asChild variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black">
                <Link href="/contact">Join Waiting List</Link>
              </Button>
            </div>

            <div className="bg-brand-blue p-8 rounded-3xl flex flex-col justify-center items-center text-center h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star className="w-32 h-32 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Current Offer</h3>
              <p className="text-lg text-blue-100 mb-6">
                Get a <strong>Free Readiness Program</strong> with every registration this month.
              </p>
              
              <div className="space-y-2 mb-8">
                 <p className="text-4xl font-extrabold text-brand-gold">R500</p>
                 <p className="text-sm text-blue-200">Registration Fee</p>
              </div>

              <Button asChild size="lg" className="w-full bg-brand-gold hover:bg-yellow-400 text-black font-bold h-12">
                <Link href="/contact">Enquire Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
