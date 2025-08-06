"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { PlaceholderManager } from "@/components/placeholder-manager"

interface CoverLetterFormProps {
  letterData: any
  setLetterData: (data: any) => void
}

export function CoverLetterForm({ letterData, setLetterData }: CoverLetterFormProps) {
  const updatePersonal = (field: string, value: string) => {
    setLetterData({
      ...letterData,
      personal: { ...letterData.personal, [field]: value },
    })
  }

  const updateCompany = (field: string, value: string) => {
    setLetterData({
      ...letterData,
      company: { ...letterData.company, [field]: value },
    })
  }

  const updateContent = (field: string, value: string) => {
    setLetterData({
      ...letterData,
      content: { ...letterData.content, [field]: value },
    })
  }

  const insertPlaceholder = (placeholderName: string, targetField: string) => {
    const currentValue = letterData.content[targetField] || ""
    const placeholder = `[${placeholderName}]`
    const newValue = currentValue + (currentValue ? " " : "") + placeholder
    updateContent(targetField, newValue)
  }

  const currentProfile = letterData.currentProfile || "default"
  const currentPlaceholders =
    letterData.companyProfiles?.[currentProfile]?.placeholders || letterData.placeholders || []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={letterData.personal.fullName}
                onChange={(e) => updatePersonal("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={letterData.personal.email}
                onChange={(e) => updatePersonal("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={letterData.personal.phone}
                onChange={(e) => updatePersonal("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={letterData.personal.address}
                onChange={(e) => updatePersonal("address", e.target.value)}
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={letterData.company.name}
                onChange={(e) => updateCompany("name", e.target.value)}
                placeholder="Acme Corporation"
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={letterData.company.position}
                onChange={(e) => updateCompany("position", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="hiringManager">Hiring Manager (Optional)</Label>
              <Input
                id="hiringManager"
                value={letterData.company.hiringManager}
                onChange={(e) => updateCompany("hiringManager", e.target.value)}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <Label htmlFor="companyAddress">Company Address (Optional)</Label>
              <Input
                id="companyAddress"
                value={letterData.company.address}
                onChange={(e) => updateCompany("address", e.target.value)}
                placeholder="456 Business Ave, City, State 12345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden">
        <PlaceholderManager letterData={letterData} setLetterData={setLetterData} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Letter Content</CardTitle>
          <p className="text-sm text-gray-600">
            Write your cover letter content below. Use existing placeholders by clicking the badges below each field.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="opening">Opening Paragraph</Label>
            <Textarea
              id="opening"
              value={letterData.content.opening || ""}
              onChange={(e) => updateContent("opening", e.target.value)}
              placeholder="Write your opening paragraph here..."
              rows={4}
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {currentPlaceholders
                ?.filter((p: any) => p.name && p.value)
                .map((placeholder: any) => (
                  <Badge
                    key={placeholder.id}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => insertPlaceholder(placeholder.name, "opening")}
                  >
                    [{placeholder.name}]
                  </Badge>
                ))}
            </div>
          </div>

          <div>
            <Label htmlFor="body">Body Paragraphs</Label>
            <Textarea
              id="body"
              value={letterData.content.body || ""}
              onChange={(e) => updateContent("body", e.target.value)}
              placeholder="Write your body paragraphs here..."
              rows={8}
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {currentPlaceholders
                ?.filter((p: any) => p.name && p.value)
                .map((placeholder: any) => (
                  <Badge
                    key={placeholder.id}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => insertPlaceholder(placeholder.name, "body")}
                  >
                    [{placeholder.name}]
                  </Badge>
                ))}
            </div>
          </div>

          <div>
            <Label htmlFor="closing">Closing Paragraph</Label>
            <Textarea
              id="closing"
              value={letterData.content.closing || ""}
              onChange={(e) => updateContent("closing", e.target.value)}
              placeholder="Write your closing paragraph here..."
              rows={4}
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {currentPlaceholders
                ?.filter((p: any) => p.name && p.value)
                .map((placeholder: any) => (
                  <Badge
                    key={placeholder.id}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => insertPlaceholder(placeholder.name, "closing")}
                  >
                    [{placeholder.name}]
                  </Badge>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}