"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  BadgeIcon as Certificate,
  Trophy,
  BookOpen,
  HeartHandshake,
  Languages,
} from "lucide-react"
import { useEffect, useState } from "react"

interface ResumeFormProps {
  resumeData: any
  setResumeData: (data: any) => void
}

export function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [activeTab, setActiveTab] = useState("personal")

  // Calculate completion percentage
  useEffect(() => {
    let completed = 0
    let total = 0

    // Personal info (10 fields)
    const personalFields = Object.values(resumeData.personal)
    total += 10
    completed += personalFields.filter((field) => field && field.toString().trim() !== "").length

    // Summary
    total += 1
    if (resumeData.summary && resumeData.summary.trim() !== "") completed += 1

    // Experience
    total += 1
    if (resumeData.experience.length > 0) completed += 1

    // Education
    total += 1
    if (resumeData.education.length > 0) completed += 1

    // Skills
    total += 1
    if (resumeData.skills.length > 0) completed += 1

    // Projects
    total += 1
    if (resumeData.projects.length > 0) completed += 1

    // Certifications
    total += 1
    if (resumeData.certifications.length > 0) completed += 1

    // Awards
    total += 1
    if (resumeData.awards.length > 0) completed += 1

    // Publications
    total += 1
    if (resumeData.publications.length > 0) completed += 1

    // Volunteer
    total += 1
    if (resumeData.volunteer.length > 0) completed += 1

    // Languages
    total += 1
    if (resumeData.languages.length > 0) completed += 1

    setCompletionPercentage(Math.round((completed / total) * 100))
  }, [resumeData])

  const updatePersonal = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [field]: value },
    })
  }

  const updateSummary = (value: string) => {
    setResumeData({ ...resumeData, summary: value })
  }

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now(),
          company: "",
          position: "",
          employmentType: "",
          locationType: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          responsibilities: [],
          achievements: [],
          technologiesUsed: "",
        },
      ],
    })
  }

  const updateExperience = (id: number, field: string, value: string | boolean | string[]) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp: any) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const addResponsibility = (expId: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp: any) =>
        exp.id === expId ? { ...exp, responsibilities: [...exp.responsibilities, ""] } : exp,
      ),
    })
  }

  const updateResponsibility = (expId: number, index: number, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp: any) =>
        exp.id === expId
          ? {
            ...exp,
            responsibilities: exp.responsibilities.map((res: string, i: number) => (i === index ? value : res)),
          }
          : exp,
      ),
    })
  }

  const removeResponsibility = (expId: number, index: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp: any) =>
        exp.id === expId
          ? {
            ...exp,
            responsibilities: exp.responsibilities.filter((_: string, i: number) => i !== index),
          }
          : exp,
      ),
    })
  }

  const addAchievement = (expId: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp: any) =>
        exp.id === expId ? { ...exp, achievements: [...exp.achievements, ""] } : exp,
      ),
    })
  }

  const updateAchievement = (expId: number, index: number, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp: any) =>
        exp.id === expId
          ? {
            ...exp,
            achievements: exp.achievements.map((ach: string, i: number) => (i === index ? value : ach)),
          }
          : exp,
      ),
    })
  }

  const removeAchievement = (expId: number, index: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp: any) =>
        exp.id === expId
          ? {
            ...exp,
            achievements: exp.achievements.filter((_: string, i: number) => i !== index),
          }
          : exp,
      ),
    })
  }

  const removeExperience = (id: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp: any) => exp.id !== id),
    })
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now(),
          school: "",
          degree: "",
          field: "",
          minor: "",
          startDate: "",
          endDate: "",
          gpa: "",
          relevantCoursework: [],
          honorsAwards: "",
        },
      ],
    })
  }

  const updateEducation = (id: number, field: string, value: string | string[]) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu: any) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const addCoursework = (eduId: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu: any) =>
        edu.id === eduId ? { ...edu, relevantCoursework: [...edu.relevantCoursework, ""] } : edu,
      ),
    })
  }

  const updateCoursework = (eduId: number, index: number, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu: any) =>
        edu.id === eduId
          ? {
            ...edu,
            relevantCoursework: edu.relevantCoursework.map((course: string, i: number) =>
              i === index ? value : course,
            ),
          }
          : edu,
      ),
    })
  }

  const removeCoursework = (eduId: number, index: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu: any) =>
        edu.id === eduId
          ? {
            ...edu,
            relevantCoursework: edu.relevantCoursework.filter((_: string, i: number) => i !== index),
          }
          : edu,
      ),
    })
  }

  const removeEducation = (id: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu: any) => edu.id !== id),
    })
  }

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { id: Date.now(), name: "", level: "Intermediate", category: "" }],
    })
  }

  const updateSkill = (id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map((skill: any) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    })
  }

  const removeSkill = (id: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill: any) => skill.id !== id),
    })
  }

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          id: Date.now(),
          name: "",
          type: "",
          role: "",
          startDate: "",
          endDate: "",
          teamSize: "",
          technologies: "",
          description: "",
          link: "",
          demoLink: "",
        },
      ],
    })
  }

  const updateProject = (id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((project: any) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    })
  }

  const removeProject = (id: number) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((project: any) => project.id !== id),
    })
  }

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        {
          id: Date.now(),
          name: "",
          issuer: "",
          date: "",
          link: "",
          credentialId: "",
          expirationDate: "",
        },
      ],
    })
  }

  const updateCertification = (id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.map((cert: any) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    })
  }

  const removeCertification = (id: number) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((cert: any) => cert.id !== id),
    })
  }

  const addAward = () => {
    setResumeData({
      ...resumeData,
      awards: [
        ...resumeData.awards,
        {
          id: Date.now(),
          name: "",
          issuer: "",
          date: "",
          description: "",
        },
      ],
    })
  }

  const updateAward = (id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      awards: resumeData.awards.map((award: any) => (award.id === id ? { ...award, [field]: value } : award)),
    })
  }

  const removeAward = (id: number) => {
    setResumeData({
      ...resumeData,
      awards: resumeData.awards.filter((award: any) => award.id !== id),
    })
  }

  const addPublication = () => {
    setResumeData({
      ...resumeData,
      publications: [
        ...resumeData.publications,
        {
          id: Date.now(),
          title: "",
          publisher: "",
          date: "",
          link: "",
        },
      ],
    })
  }

  const updatePublication = (id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      publications: resumeData.publications.map((pub: any) => (pub.id === id ? { ...pub, [field]: value } : pub)),
    })
  }

  const removePublication = (id: number) => {
    setResumeData({
      ...resumeData,
      publications: resumeData.publications.filter((pub: any) => pub.id !== id),
    })
  }

  const addVolunteer = () => {
    setResumeData({
      ...resumeData,
      volunteer: [
        ...resumeData.volunteer,
        {
          id: Date.now(),
          organization: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const updateVolunteer = (id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      volunteer: resumeData.volunteer.map((vol: any) => (vol.id === id ? { ...vol, [field]: value } : vol)),
    })
  }

  const removeVolunteer = (id: number) => {
    setResumeData({
      ...resumeData,
      volunteer: resumeData.volunteer.filter((vol: any) => vol.id !== id),
    })
  }

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [
        ...resumeData.languages,
        {
          id: Date.now(),
          name: "",
          proficiency: "Conversational",
        },
      ],
    })
  }

  const updateLanguage = (id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.map((lang: any) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    })
  }

  const removeLanguage = (id: number) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((lang: any) => lang.id !== id),
    })
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Resume Completion</span>
            <span className="text-sm font-medium text-gray-700">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="w-full overflow-x-auto">

          <TabsList className="flex w-max whitespace-nowrap h-20 items-center gap-2 px-4">
            <TabsTrigger value="personal" className="flex items-center gap-2 shrink-0">
              <User className="w-4 h-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2 shrink-0">
              <Briefcase className="w-4 h-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2 shrink-0">
              <GraduationCap className="w-4 h-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 shrink-0">
              <Award className="w-4 h-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2 shrink-0">
              <FileText className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-2 shrink-0">
              <Certificate className="w-4 h-4" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="awards" className="flex items-center gap-2 shrink-0">
              <Trophy className="w-4 h-4" />
              Awards
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-2 shrink-0">
              <BookOpen className="w-4 h-4" />
              Publications
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="flex items-center gap-2 shrink-0">
              <HeartHandshake className="w-4 h-4" />
              Volunteer
            </TabsTrigger>
            <TabsTrigger value="languages" className="flex items-center gap-2 shrink-0">
              <Languages className="w-4 h-4" />
              Languages
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="personal" className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={resumeData.personal.fullName}
                    onChange={(e) => updatePersonal("fullName", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="professionalTitle">Professional Title/Headline</Label>
                  <Input
                    id="professionalTitle"
                    value={resumeData.personal.professionalTitle}
                    onChange={(e) => updatePersonal("professionalTitle", e.target.value)}
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personal.email}
                    onChange={(e) => updatePersonal("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={resumeData.personal.phone}
                    onChange={(e) => updatePersonal("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="location">City, State *</Label>
                  <Input
                    id="location"
                    value={resumeData.personal.location}
                    onChange={(e) => updatePersonal("location", e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={resumeData.personal.country}
                    onChange={(e) => updatePersonal("country", e.target.value)}
                    placeholder="USA"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={resumeData.personal.website}
                    onChange={(e) => updatePersonal("website", e.target.value)}
                    placeholder="https://johndoe.com"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={resumeData.personal.linkedin}
                    onChange={(e) => updatePersonal("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={resumeData.personal.github}
                    onChange={(e) => updatePersonal("github", e.target.value)}
                    placeholder="github.com/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input
                    id="portfolio"
                    value={resumeData.personal.portfolio}
                    onChange={(e) => updatePersonal("portfolio", e.target.value)}
                    placeholder="https://johndoe.design"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Write a brief summary of your professional background and key achievements..."
                rows={4}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          {/* Work Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button onClick={addExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.experience.map((exp: any) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <Label>Company *</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <Label>Position *</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          placeholder="Job Title"
                        />
                      </div>
                      <div>
                        <Label>Employment Type</Label>
                        <Select
                          value={exp.employmentType}
                          onValueChange={(value) => updateExperience(exp.id, "employmentType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Location Type</Label>
                        <Select
                          value={exp.locationType}
                          onValueChange={(value) => updateExperience(exp.id, "locationType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="On-site">On-site</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Start Date *</Label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Technologies Used (comma-separated)</Label>
                        <Input
                          value={exp.technologiesUsed}
                          onChange={(e) => updateExperience(exp.id, "technologiesUsed", e.target.value)}
                          placeholder="React, Node.js, AWS"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Key Responsibilities</Label>
                      <Button onClick={() => addResponsibility(exp.id)} size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" /> Add Responsibility
                      </Button>
                    </div>
                    {exp.responsibilities.map((res: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={res}
                          onChange={(e) => updateResponsibility(exp.id, index, e.target.value)}
                          placeholder="e.g., Managed a team of 5 engineers"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeResponsibility(exp.id, index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Key Achievements</Label>
                      <Button onClick={() => addAchievement(exp.id)} size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" /> Add Achievement
                      </Button>
                    </div>
                    {exp.achievements.map((ach: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={ach}
                          onChange={(e) => updateAchievement(exp.id, index, e.target.value)}
                          placeholder="e.g., Increased sales by 15% in Q3"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAchievement(exp.id, index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {resumeData.experience.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No work experience added yet.</p>
                  <p className="text-sm">Click "Add Experience" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button onClick={addEducation} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.education.map((edu: any) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <Label>School *</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <Label>Degree *</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Bachelor's, Master's, etc."
                        />
                      </div>
                      <div>
                        <Label>Field of Study</Label>
                        <Input
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>
                      <div>
                        <Label>Minor (Optional)</Label>
                        <Input
                          value={edu.minor}
                          onChange={(e) => updateEducation(edu.id, "minor", e.target.value)}
                          placeholder="Mathematics"
                        />
                      </div>
                      <div>
                        <Label>GPA (Optional)</Label>
                        <Input
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                          placeholder="3.8/4.0"
                        />
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Honors & Awards</Label>
                        <Input
                          value={edu.honorsAwards}
                          onChange={(e) => updateEducation(edu.id, "honorsAwards", e.target.value)}
                          placeholder="Dean's List, Magna Cum Laude"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Relevant Coursework</Label>
                      <Button onClick={() => addCoursework(edu.id)} size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" /> Add Course
                      </Button>
                    </div>
                    {edu.relevantCoursework.map((course: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={course}
                          onChange={(e) => updateCoursework(edu.id, index, e.target.value)}
                          placeholder="e.g., Advanced Algorithms"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCoursework(edu.id, index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {resumeData.education.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No education added yet.</p>
                  <p className="text-sm">Click "Add Education" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button onClick={addSkill} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.skills.map((skill: any) => (
                <div key={skill.id} className="flex items-center space-x-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Skill Name</Label>
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                        placeholder="Skill name"
                      />
                    </div>
                    <div>
                      <Label>Proficiency</Label>
                      <Select value={skill.level} onValueChange={(value) => updateSkill(skill.id, "level", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input
                        value={skill.category}
                        onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
                        placeholder="e.g., Programming Languages"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {resumeData.skills.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No skills added yet.</p>
                  <p className="text-sm">Click "Add Skill" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {/* Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button onClick={addProject} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.projects.map((project: any) => (
                <div key={project.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <Label>Project Name *</Label>
                        <Input
                          value={project.name}
                          onChange={(e) => updateProject(project.id, "name", e.target.value)}
                          placeholder="Project Name"
                        />
                      </div>
                      <div>
                        <Label>Your Role</Label>
                        <Input
                          value={project.role}
                          onChange={(e) => updateProject(project.id, "role", e.target.value)}
                          placeholder="Lead Developer, Contributor"
                        />
                      </div>
                      <div>
                        <Label>Project Type</Label>
                        <Select
                          value={project.type}
                          onValueChange={(value) => updateProject(project.id, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Personal">Personal</SelectItem>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="Open Source">Open Source</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Team Size</Label>
                        <Input
                          type="number"
                          value={project.teamSize}
                          onChange={(e) => updateProject(project.id, "teamSize", e.target.value)}
                          placeholder="e.g., 3"
                        />
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          value={project.startDate}
                          onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          value={project.endDate}
                          onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Technologies (comma-separated)</Label>
                        <Input
                          value={project.technologies}
                          onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Project Link</Label>
                        <Input
                          value={project.link}
                          onChange={(e) => updateProject(project.id, "link", e.target.value)}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Demo Link (Optional)</Label>
                        <Input
                          value={project.demoLink}
                          onChange={(e) => updateProject(project.id, "demoLink", e.target.value)}
                          placeholder="https://project-demo.com"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, "description", e.target.value)}
                      placeholder="Describe the project and your contributions..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              {resumeData.projects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No projects added yet.</p>
                  <p className="text-sm">Click "Add Project" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          {/* Certifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications</CardTitle>
              <Button onClick={addCertification} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.certifications.map((cert: any) => (
                <div key={cert.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <Label>Certification Name *</Label>
                        <Input
                          value={cert.name}
                          onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                          placeholder="AWS Certified Solutions Architect"
                        />
                      </div>
                      <div>
                        <Label>Issuing Organization</Label>
                        <Input
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div>
                        <Label>Date Issued</Label>
                        <Input
                          value={cert.date}
                          onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div>
                        <Label>Expiration Date (Optional)</Label>
                        <Input
                          value={cert.expirationDate}
                          onChange={(e) => updateCertification(cert.id, "expirationDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div>
                        <Label>Credential ID (Optional)</Label>
                        <Input
                          value={cert.credentialId}
                          onChange={(e) => updateCertification(cert.id, "credentialId", e.target.value)}
                          placeholder="ABC123XYZ"
                        />
                      </div>
                      <div>
                        <Label>Credential URL (Optional)</Label>
                        <Input
                          value={cert.link}
                          onChange={(e) => updateCertification(cert.id, "link", e.target.value)}
                          placeholder="https://www.credly.com/badges/..."
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(cert.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {resumeData.certifications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Certificate className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No certifications added yet.</p>
                  <p className="text-sm">Click "Add Certification" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="awards" className="space-y-6">
          {/* Awards & Honors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Awards & Honors</CardTitle>
              <Button onClick={addAward} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Award
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.awards.map((award: any) => (
                <div key={award.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <Label>Award Name *</Label>
                        <Input
                          value={award.name}
                          onChange={(e) => updateAward(award.id, "name", e.target.value)}
                          placeholder="Employee of the Year"
                        />
                      </div>
                      <div>
                        <Label>Issuer</Label>
                        <Input
                          value={award.issuer}
                          onChange={(e) => updateAward(award.id, "issuer", e.target.value)}
                          placeholder="Company Name, Organization"
                        />
                      </div>
                      <div>
                        <Label>Date Received</Label>
                        <Input
                          value={award.date}
                          onChange={(e) => updateAward(award.id, "date", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={award.description}
                          onChange={(e) => updateAward(award.id, "description", e.target.value)}
                          placeholder="Briefly describe the award and its significance."
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAward(award.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {resumeData.awards.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No awards or honors added yet.</p>
                  <p className="text-sm">Click "Add Award" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publications" className="space-y-6">
          {/* Publications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Publications</CardTitle>
              <Button onClick={addPublication} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Publication
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.publications.map((pub: any) => (
                <div key={pub.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <Label>Title *</Label>
                        <Input
                          value={pub.title}
                          onChange={(e) => updatePublication(pub.id, "title", e.target.value)}
                          placeholder="Research Paper Title"
                        />
                      </div>
                      <div>
                        <Label>Publisher</Label>
                        <Input
                          value={pub.publisher}
                          onChange={(e) => updatePublication(pub.id, "publisher", e.target.value)}
                          placeholder="Journal Name, Conference Proceedings"
                        />
                      </div>
                      <div>
                        <Label>Date Published</Label>
                        <Input
                          value={pub.date}
                          onChange={(e) => updatePublication(pub.id, "date", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div>
                        <Label>Link (Optional)</Label>
                        <Input
                          value={pub.link}
                          onChange={(e) => updatePublication(pub.id, "link", e.target.value)}
                          placeholder="https://doi.org/..."
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePublication(pub.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {resumeData.publications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No publications added yet.</p>
                  <p className="text-sm">Click "Add Publication" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volunteer" className="space-y-6">
          {/* Volunteer Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Volunteer Experience</CardTitle>
              <Button onClick={addVolunteer} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Volunteer Role
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.volunteer.map((vol: any) => (
                <div key={vol.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <div>
                        <Label>Organization *</Label>
                        <Input
                          value={vol.organization}
                          onChange={(e) => updateVolunteer(vol.id, "organization", e.target.value)}
                          placeholder="Charity Name"
                        />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Input
                          value={vol.role}
                          onChange={(e) => updateVolunteer(vol.id, "role", e.target.value)}
                          placeholder="Volunteer Coordinator"
                        />
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          value={vol.startDate}
                          onChange={(e) => updateVolunteer(vol.id, "startDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          value={vol.endDate}
                          onChange={(e) => updateVolunteer(vol.id, "endDate", e.target.value)}
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVolunteer(vol.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={vol.description}
                      onChange={(e) => updateVolunteer(vol.id, "description", e.target.value)}
                      placeholder="Describe your contributions and impact..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              {resumeData.volunteer.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <HeartHandshake className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No volunteer experience added yet.</p>
                  <p className="text-sm">Click "Add Volunteer Role" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-6">
          {/* Languages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Languages</CardTitle>
              <Button onClick={addLanguage} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Language
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.languages.map((lang: any) => (
                <div key={lang.id} className="flex items-center space-x-4">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <Label>Language Name</Label>
                      <Input
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                        placeholder="e.g., Spanish"
                      />
                    </div>
                    <div>
                      <Label>Proficiency</Label>
                      <Select
                        value={lang.proficiency}
                        onValueChange={(value) => updateLanguage(lang.id, "proficiency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Native">Native</SelectItem>
                          <SelectItem value="Fluent">Fluent</SelectItem>
                          <SelectItem value="Conversational">Conversational</SelectItem>
                          <SelectItem value="Basic">Basic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(lang.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {resumeData.languages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Languages className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No languages added yet.</p>
                  <p className="text-sm">Click "Add Language" to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}