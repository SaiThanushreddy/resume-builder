import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, PenTool, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600 ml-2">Trusted by 50,000+ professionals</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Build Your Perfect
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Resume</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create professional resumes and cover letters in minutes with our AI-powered builder. Choose from 20+
          ATS-friendly templates and export as PDF.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Link href="/resume-builder">
              <FileText className="w-5 h-5 mr-2" />
              Build Resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/cover-letter">
              <PenTool className="w-5 h-5 mr-2" />
              Create Cover Letter
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">50K+</div>
            <div className="text-sm text-gray-600">Resumes Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">ATS Pass Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">4.9/5</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
