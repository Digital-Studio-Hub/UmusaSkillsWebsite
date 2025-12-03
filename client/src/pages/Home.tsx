import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import CourseCard from "@/components/ui/CourseCard";
import { Button } from "@/components/ui/button";
import { GENERAL_COURSES, TESTIMONIALS } from "@/lib/constants";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Laptop,
  Users,
  Trophy,
} from "lucide-react";
import { Link } from "wouter";
import officeImage from "@assets/generated_images/office_administration_training.png";
import teflImage from "@assets/generated_images/online_english_teacher_for_tefl_page.png";

export default function Home() {
  const popularCourses = [
    "TEFL",
    "Office Administration",
    "Health & Safety",
    "Computer Literacy",
  ];

  return (
    <Layout>
      <Hero />

      {/* Features / Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              Why Choose Umusa Skills Development?
            </h2>
            <p className="text-gray-600 text-lg">
              We are dedicated to building skills and futures through
              accessible, high-quality education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Accredited Training",
                desc: "Recognized qualifications that open doors to employment.",
              },
              {
                icon: Laptop,
                title: "Study From Home",
                desc: "Flexible online learning platforms that fit your schedule.",
              },
              {
                icon: Users,
                title: "Job Placement Support",
                desc: "We help you find employment after successful completion.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/10 text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue">
              Most Popular Courses
            </h2>
            <Button
              asChild
              variant="ghost"
              className="text-brand-blue hover:text-brand-ink font-bold mt-4 md:mt-0"
            >
              <Link href="/courses">
                View All Courses <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course, i) => (
              <CourseCard
                key={course}
                title={course}
                category="General"
                image={course.includes("TEFL") ? teflImage : officeImage}
                featured={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-20 bg-brand-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-brand-gold text-black font-bold text-sm mb-6 animate-pulse">
            MONTHLY SPECIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Unlock Your Potential for Less
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Check out our latest special offers and save on your registration and course fees.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-brand-blue hover:bg-gray-100 font-bold h-14 px-8 text-lg rounded-full"
          >
            <Link href="/specials">View Current Specials</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-blue mb-16">
            Student Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
              >
                <div className="flex text-brand-gold mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-brand-blue">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-brand-ink rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-blue/50 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-White-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students upgrading their skills and careers
                with Umusa.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-gold hover:bg-yellow-500 text-black font-bold h-12 px-8"
                >
                  <Link href="/contact">Enroll Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-brand-blue font-bold h-12 px-8"
                >
                  <Link href="/courses">View All Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
