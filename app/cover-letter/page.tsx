"use client"

import { useState, useEffect } from "react"

interface Placeholder {
  id: number
  name: string
  value: string
}

interface CompanyProfile {
  name: string
  placeholders: Placeholder[]
}

interface LetterData {
  personal: {
    fullName: string
    email: string
    phone: string
    address: string
  }
  company: {
    name: string
    address: string
    hiringManager: string
    position: string
  }
  content: {
    opening: string
    body: string
    closing: string
  }
  currentProfile: string
  companyProfiles: { [key: string]: CompanyProfile }
  placeholders: Placeholder[]
  date: string
}
import { Header } from "@/components/header"
import  {CoverLetterForm}  from "@/components/cover-letter-form"
import { CoverLetterPreview } from "@/components/cover-letter-preview"
import { Button } from "@/components/ui/button"
import { Download, Eye, EyeOff, Save, Building2 } from "lucide-react"
import { ZoomControls } from "@/components/zoom-controls"
import { useZoom } from "@/hooks/use-zoom"

export default function CoverLetterPage() {
  const [showPreview, setShowPreview] = useState(true)
  const { zoomLevel, zoomIn, zoomOut, resetZoom } = useZoom()

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const [letterData, setLetterData] = useState<LetterData>({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
    company: {
      name: "",
      address: "",
      hiringManager: "",
      position: "",
    },
    content: {
      opening: "",
      body: "",
      closing: "",
    },
    currentProfile: "default",
    companyProfiles: {
      default: {
        name: "Default Profile",
        placeholders: [],
      },
    },
    placeholders: [],
    date: currentDate,
  })

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem("coverLetterData")
    if (savedData) {
      try {
        const parsedData: LetterData = JSON.parse(savedData)
        if (!parsedData.companyProfiles) {
          parsedData.companyProfiles = {
            default: {
              name: "Default Profile",
              placeholders: [],
            },
          }
          parsedData.currentProfile = "default"
        }
        setLetterData(parsedData)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  // Save changes
  useEffect(() => {
    localStorage.setItem("coverLetterData", JSON.stringify(letterData))
  }, [letterData])

  const handleExport = () => {
    alert("PDF export functionality would be implemented here!")
  }

  const handleSave = () => {
    localStorage.setItem("coverLetterData", JSON.stringify(letterData))
    const currentProfileName = letterData.companyProfiles[letterData.currentProfile]?.name || "Default Profile"
    alert(`Cover letter saved successfully for "${currentProfileName}"!`)
  }

  const currentProfileName = letterData.companyProfiles[letterData.currentProfile]?.name || "Default Profile"

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-4 flex-1 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cover Letter Builder</h1>
            <div className="flex items-center gap-2 mt-2">
              <Building2 className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Current Profile: {currentProfileName}
              </span>
            </div>
          </div>
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

        <div className="grid h-full lg:grid-cols-[1fr_820px] gap-3 overflow-hidden">
          <div className="overflow-y-auto h-full space-y-6 pb-10">
            <CoverLetterForm letterData={letterData} setLetterData={setLetterData} />
          </div>

          {showPreview && (
            <div className="lg:sticky lg:top-4 self-start max-h-full">
              <CoverLetterPreview letterData={letterData} zoomLevel={zoomLevel} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}