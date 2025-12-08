import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface CourseCardProps {
  title: string;
  category: string;
  description?: string;
  duration?: string;
  image?: string;
  featured?: boolean;
}

export default function CourseCard({ 
  title, 
  category, 
  description = "Start your career with our comprehensive training module.", 
  duration = "Self-paced",
  image,
  featured = false
}: CourseCardProps) {
  return (
    <Card className={`group overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl border-gray-100 ${featured ? 'border-brand-gold ring-1 ring-brand-gold/50' : ''}`}>
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-brand-blue/10 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-brand-blue/40" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className="bg-brand-gold text-black">
            {category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold font-heading text-gray-900 line-clamp-2 group-hover:text-brand-blue transition-colors">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button asChild className="w-full bg-brand-ink hover:bg-brand-blue text-white">
          <Link href="/contact">
            Enquire Now <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
