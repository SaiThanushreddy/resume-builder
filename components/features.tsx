import { Card, CardContent } from "@/components/ui/card"
import { FileText, Download, Palette, Zap, Shield, Globe, Brain, Users } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from 20+ professionally designed templates that pass ATS systems.",
  },
  {
    icon: Zap,
    title: "Real-time Preview",
    description: "See your resume update instantly as you type with our live preview feature.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download your resume as a high-quality PDF ready for job applications.",
  },
  {
    icon: Palette,
    title: "Customizable Design",
    description: "Personalize colors, fonts, and layouts to match your style and industry.",
  },
  {
    icon: Shield,
    title: "ATS Friendly",
    description: "All templates are optimized to pass Applicant Tracking Systems.",
  },
  {
    icon: Globe,
    title: "Multiple Formats",
    description: "Create both resumes and cover letters with matching designs.",
  },
  {
    icon: Brain,
    title: "AI Suggestions",
    description: "Get smart content recommendations powered by artificial intelligence.",
  },
  {
    icon: Users,
    title: "Expert Reviewed",
    description: "Templates reviewed by HR professionals and career experts.",
  },
]

export function Features() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Land Your Dream Job</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our resume builder comes packed with features to help you create the perfect resume and cover letter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
