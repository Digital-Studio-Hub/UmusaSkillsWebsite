import { useState } from "react";
import Layout from "@/components/layout/Layout";
import CourseCard from "@/components/ui/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GENERAL_COURSES } from "@/lib/constants";
import { Search } from "lucide-react";
import tradesImage from "@assets/generated_images/trades_training_for_courses_page.png";

export default function Courses() {
  const [search, setSearch] = useState("");

  const filterCourses = (list: string[]) => {
    return list.filter(c => c.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-brand-blue text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={tradesImage} alt="Training" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Our Courses</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Explore our wide range of professional skills courses designed to get you hired.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search for a course..." 
              className="pl-10 h-12 bg-white text-black rounded-full border-none shadow-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterCourses(GENERAL_COURSES).map((course) => (
            <CourseCard 
              key={course} 
              title={course} 
              category="Professional Skills"
              image={tradesImage} // Placeholder reuse
            />
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-20 bg-yellow-50 border border-yellow-100 rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-brand-blue mb-4">Fees & Registration</h3>
          <p className="text-gray-600 mb-6">
            Registration Fee: <strong className="text-brand-blue">R500</strong><br/>
            We offer flexible payment plans to suit your budget.
          </p>
          <Button className="bg-brand-blue hover:bg-brand-ink text-white font-bold rounded-full px-8">
            Request Fee Structure
          </Button>
        </div>
      </div>
    </Layout>
  );
}
