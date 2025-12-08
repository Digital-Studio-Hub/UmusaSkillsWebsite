import Layout from "@/components/layout/Layout";
import { COMPANY_INFO } from "@/lib/constants";
import { CheckCircle2, Users, Target, Award } from "lucide-react";
import officeImage from "@assets/generated_images/office_administration_training.png";

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 font-heading">About Us</h1>
            <p className="text-xl text-gray-600">
              {COMPANY_INFO.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src={officeImage} 
                alt="Our Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  At Umusa Skills Development, we are committed to bridging the gap between education and employment. 
                  Our mission is to provide accessible, high-quality training that empowers individuals with practical skills 
                  needed in today's job market.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <Target className="w-8 h-8 text-brand-blue mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-sm text-gray-600">To be the leading provider of flexible, employment-focused skills training in South Africa.</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <Award className="w-8 h-8 text-brand-gold mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Our Values</h3>
                  <p className="text-sm text-gray-600">Excellence, Integrity, Accessibility, and Student Success are at the heart of everything we do.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xl">
                    L
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Lee-Ann</p>
                    <p className="text-sm text-gray-500">CEO / Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-brand-blue mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Professional Skills Courses",
              "Lifetime Support & Guidance",
              "Study-From-Home Flexibility",
              "Free Readiness Programs",
              "Practical Demonstrations",
              "Job Placement Assistance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <CheckCircle2 className="w-6 h-6 text-brand-gold flex-shrink-0 mt-1" />
                <span className="font-medium text-gray-700 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
