"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { Download, Eye, EyeOff, Save } from "lucide-react"
import { ZoomControls } from "@/components/zoom-controls"
import { useZoom } from "@/hooks/use-zoom"

export default function ResumeBuilderPage() {
  const [showPreview, setShowPreview] = useState(true)
  const { zoomLevel, zoomIn, zoomOut, resetZoom } = useZoom()

  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: "",
      professionalTitle: "",
      email: "",
      phone: "",
      location: "",
      country: "",
      website: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    awards: [],
    publications: [],
    volunteer: [],
    languages: [],
  })

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        const defaultPersonal = {
          fullName: "",
          professionalTitle: "",
          email: "",
          phone: "",
          location: "",
          country: "",
          website: "",
          linkedin: "",
          github: "",
          portfolio: "",
        }
        const defaultResumeData = {
          personal: { ...defaultPersonal, ...parsedData.personal },
          summary: parsedData.summary || "",
          experience: parsedData.experience || [],
          education: parsedData.education || [],
          skills: parsedData.skills || [],
          projects: parsedData.projects || [],
          certifications: parsedData.certifications || [],
          awards: parsedData.awards || [],
          publications: parsedData.publications || [],
          volunteer: parsedData.volunteer || [],
          languages: parsedData.languages || [],
        }
        setResumeData(defaultResumeData)
      } catch (error) {
        console.error("Error loading saved resume data:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  const handleExport = () => {
    alert("PDF export functionality would be implemented here!")
  }

  const handleSave = () => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
    alert("Resume saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <div className="flex items-center space-x-4">
            <ZoomControls zoomLevel={zoomLevel} onZoomIn={zoomIn} onZoomOut={zoomOut} onResetZoom={resetZoom} />
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="hidden lg:flex">
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleExport} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
            <div className="overflow-y-auto pr-2">
              <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            </div>

            {showPreview && (
              <div className="hidden lg:block overflow-hidden">
                <div className="sticky top-3">
                  <ResumePreview resumeData={resumeData} zoomLevel={zoomLevel} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
