import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calculator, DollarSign, Globe, Clock } from "lucide-react";
import teflImage from "@assets/generated_images/online_english_teacher_for_tefl_page.png";

export default function Tefl() {
  return (
    <Layout>
      <div className="relative bg-brand-blue py-20">
        <div className="absolute inset-0 opacity-20">
          <img src={teflImage} alt="TEFL Teacher" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Teach English Online</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Earn a dollar-based income working from home. No degree required for many platforms.
          </p>
          <Button asChild size="lg" className="bg-brand-gold hover:bg-yellow-500 text-black font-bold">
            <Link href="/contact">Start Your TEFL Journey</Link>
          </Button>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-blue mb-4">Potential Earnings Calculator</h2>
              <p className="text-gray-600">Based on standard industry rates (1 USD = R18.81)</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <DollarSign className="text-green-600" />
                      <span className="font-bold">Rate per Lesson</span>
                    </div>
                    <span className="text-xl font-bold">$6.00</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <Clock className="text-blue-600" />
                      <span className="font-bold">Lesson Duration</span>
                    </div>
                    <span className="text-xl font-bold">25 Mins</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <Globe className="text-purple-600" />
                      <span className="font-bold">Lessons per Week</span>
                    </div>
                    <span className="text-xl font-bold">51</span>
                  </div>
                </div>

                <div className="bg-brand-blue text-white rounded-2xl p-6 flex flex-col justify-center text-center space-y-6">
                  <div>
                    <p className="text-blue-200 text-sm uppercase tracking-wider mb-1">Weekly Earnings</p>
                    <p className="text-4xl font-bold">R5,755.86</p>
                  </div>
                  <div className="w-full h-px bg-blue-400/30" />
                  <div>
                    <p className="text-blue-200 text-sm uppercase tracking-wider mb-1">Monthly Earnings</p>
                    <p className="text-5xl font-extrabold text-brand-gold">R23,023.44</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-6">
                *Earnings are estimates based on full-time hours. Rates vary by platform and experience.
              </p>
              <Button asChild size="lg" className="bg-brand-ink hover:bg-brand-blue text-white font-bold px-8">
                <Link href="/contact">Sign Up for TEFL Webinar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
