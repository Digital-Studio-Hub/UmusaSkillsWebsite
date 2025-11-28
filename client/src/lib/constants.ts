import { LayoutDashboard, GraduationCap, Phone, Tag, BookOpen, CheckCircle } from "lucide-react";

export const COMPANY_INFO = {
  name: "Umusa Skills Development",
  tagline: "Building Skills. Building Futures.",
  phone: "074 458 5435",
  email: "umusaskillsdevelopment@gmail.com",
  whatsapp: "https://wa.me/27744585435", // Assuming SA code
  address: "Online / Study From Home",
  ceo: "Lee-Ann"
};

export const NAV_LINKS = [
  { name: "Home", path: "/", icon: LayoutDashboard },
  { name: "About", path: "/about", icon: BookOpen },
  { name: "Courses", path: "/courses", icon: GraduationCap },
  { name: "Specials", path: "/specials", icon: Tag },
  { name: "TEFL Info", path: "/tefl", icon: CheckCircle },
  { name: "Contact", path: "/contact", icon: Phone },
];

export const GENERAL_COURSES = [
  "TEFL", "Office Administration", "Cashier", "Cyber Security", "Hospitality",
  "Accounting", "Home Base Care", "Data Analysis", "Business Management",
  "Hotel Management", "Office Management", "Construction Management",
  "Clinical Management", "Teaching Assistant", "HR", "Security Guard",
  "Customer Service", "Fire Safety", "Travel & Tourism", "Computer Literacy",
  "Forklift", "Agriculture", "Baking & Catering", "Barista", "Beauty & Nails",
  "Lashes", "Massage", "Public Relations", "Fashion Design",
  "Recruitment Skills", "Warehouse & Material Handling",
  "Personal Development", "Digital Marketing"
];

export const QCTO_COURSES = [
  "Plumbing Hand", "Assistant Baker", "Shielded Metal Arc", "Hairstylist",
  "Coded Welding", "Field Ranger", "Wheel Balancer", "Java Programmer",
  "Cybersecurity Defender", "Front-End Web Designer", "Python Programmer",
  "Occupational Health and Safety Assistant", "Office Administrator",
  "Project Manager", "Social Auxiliary Worker", "Social Counselling Worker",
  "Home Based Personal Care Worker", "Nail Therapist", "Assessment Practitioner",
  "Assistant Life Coach", "Intermediate Emergency First Aid Responder",
  "Workplace Preparedness", "Community Development Worker",
  "Learning & Development Facilitator", "Assistant Handyperson",
  "Job Placement Facilitator", "Workplace Essential Skills",
  "Career Development Information Officer", "Bookkeeper",
  "Early Childhood Development Practitioner", "Christian Religious Professional",
  "Early Childhood Caregiver", "Technopreneur", "New Venture Creation"
];

export const TESTIMONIALS = [
  {
    name: "Thando M.",
    course: "TEFL Course",
    text: "I started teaching online within 3 weeks of completing my TEFL course. The support from Umusa was incredible!",
    rating: 5
  },
  {
    name: "Sarah J.",
    course: "Office Admin",
    text: "The study material was easy to understand and the practical demonstrations helped me get a job as a receptionist.",
    rating: 5
  },
  {
    name: "David K.",
    course: "Health & Safety",
    text: "Affordable and professional. I highly recommend Umusa Skills Development to anyone looking to upskill.",
    rating: 4
  }
];
