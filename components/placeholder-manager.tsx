"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Building2, Copy, Trash2, Edit, Save, Variable, Replace } from "lucide-react"
import { useState } from "react"

interface Placeholder {
  id: number
  name: string
  value: string
}

interface PlaceholderManagerProps {
  letterData: any
  setLetterData: (data: any) => void
}

export function PlaceholderManager({ letterData, setLetterData }: PlaceholderManagerProps) {
  const [selectedCompanyProfile, setSelectedCompanyProfile] = useState(letterData.currentProfile || "default")
  const [newProfileName, setNewProfileName] = useState("")
  const [showNewProfileDialog, setShowNewProfileDialog] = useState(false)
  const [showCreatePlaceholderDialog, setShowCreatePlaceholderDialog] = useState(false)
  const [showReplacePlaceholderDialog, setShowReplacePlaceholderDialog] = useState(false)
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<any>(null)
  const [newPlaceholderName, setNewPlaceholderName] = useState("")
  const [selectedTextToReplace, setSelectedTextToReplace] = useState("")
  const [replacementText, setReplacementText] = useState("")
  const [editingPlaceholder, setEditingPlaceholder] = useState<number | null>(null)

  const companyProfiles = letterData.companyProfiles || {
    default: {
      name: "Default Profile",
      placeholders: [],
    },
  }

  const currentPlaceholders = companyProfiles[selectedCompanyProfile]?.placeholders || []

  const createNewProfile = () => {
    if (!newProfileName.trim()) return

    const profileId = newProfileName.toLowerCase().replace(/[^a-z0-9]/g, "_")
    const updatedProfiles = {
      ...companyProfiles,
      [profileId]: {
        name: newProfileName,
        placeholders: [],
      },
    }

    const updatedData = {
      ...letterData,
      companyProfiles: updatedProfiles,
      currentProfile: profileId,
      placeholders: [],
    }

    setLetterData(updatedData)
    setSelectedCompanyProfile(profileId)
    setNewProfileName("")
    setShowNewProfileDialog(false)
  }

  const switchProfile = (profileId: string) => {
    const profilePlaceholders = companyProfiles[profileId]?.placeholders || []
    
    const updatedData = {
      ...letterData,
      currentProfile: profileId,
      placeholders: profilePlaceholders,
    }
    
    setSelectedCompanyProfile(profileId)
    setLetterData(updatedData)
  }

  const createPlaceholderFromText = () => {
    if (!selectedTextToReplace.trim() || !newPlaceholderName.trim()) return

    const placeholderName = newPlaceholderName.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_")
    const placeholderValue = selectedTextToReplace.trim()

    // Remove existing placeholder with same name
    const filteredPlaceholders = currentPlaceholders.filter((p: any) => p.name !== placeholderName)
    
    const newPlaceholder = {
      id: Date.now(),
      name: placeholderName,
      value: placeholderValue,
    }

    const updatedPlaceholders = [...filteredPlaceholders, newPlaceholder]
    const updatedProfiles = {
      ...companyProfiles,
      [selectedCompanyProfile]: {
        ...companyProfiles[selectedCompanyProfile],
        placeholders: updatedPlaceholders,
      },
    }

    // Replace text in content with placeholder
    const replaceTextInContent = (content: string) => {
      if (!content) return content
      return content.replace(new RegExp(selectedTextToReplace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `[${placeholderName}]`)
    }

    const updatedContent = {
      opening: replaceTextInContent(letterData.content.opening),
      body: replaceTextInContent(letterData.content.body),
      closing: replaceTextInContent(letterData.content.closing),
    }

    const updatedData = {
      ...letterData,
      companyProfiles: updatedProfiles,
      placeholders: updatedPlaceholders,
      content: updatedContent,
    }

    setLetterData(updatedData)
    setSelectedTextToReplace("")
    setNewPlaceholderName("")
    setShowCreatePlaceholderDialog(false)
  }

  const replaceAllPlaceholderOccurrences = () => {
    if (!selectedPlaceholder || !replacementText.trim()) return

    const replaceInContent = (content: string) => {
      if (!content) return content
      // Escape special regex characters in the placeholder name
      const escapedName = selectedPlaceholder.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      // Create regex pattern to match [PLACEHOLDER_NAME]
      const pattern = new RegExp(`\\[${escapedName}\\]`, 'g')
      return content.replace(pattern, replacementText.trim())
    }

    const updatedContent = {
      opening: replaceInContent(letterData.content.opening || ""),
      body: replaceInContent(letterData.content.body || ""),
      closing: replaceInContent(letterData.content.closing || ""),
    }

    const updatedData = {
      ...letterData,
      content: updatedContent,
    }

    setLetterData(updatedData)
    setSelectedPlaceholder(null)
    setReplacementText("")
    setShowReplacePlaceholderDialog(false)
  }

  const updatePlaceholder = (id: number, field: string, value: string) => {
    const updatedPlaceholders = currentPlaceholders.map((p: Placeholder) =>
      p.id === id ? { ...p, [field]: value } : p
    )

    const updatedProfiles = {
      ...companyProfiles,
      [selectedCompanyProfile]: {
        ...companyProfiles[selectedCompanyProfile],
        placeholders: updatedPlaceholders,
      },
    }

    const updatedData = {
      ...letterData,
      companyProfiles: updatedProfiles,
      placeholders: updatedPlaceholders,
    }

    setLetterData(updatedData)
  }

  const removePlaceholder = (id: number) => {
    const updatedPlaceholders = currentPlaceholders.filter((p: Placeholder) => p.id !== id)
    const updatedProfiles = {
      ...companyProfiles,
      [selectedCompanyProfile]: {
        ...companyProfiles[selectedCompanyProfile],
        placeholders: updatedPlaceholders,
      },
    }

    const updatedData = {
      ...letterData,
      companyProfiles: updatedProfiles,
      placeholders: updatedPlaceholders,
    }

    setLetterData(updatedData)

    if (editingPlaceholder === id) {
      setEditingPlaceholder(null)
    }
  }

  const deleteProfile = (profileId: string) => {
    if (profileId === "default") return

    const updatedProfiles = { ...companyProfiles }
    delete updatedProfiles[profileId]

    const newCurrentProfile = "default"
    const defaultPlaceholders = updatedProfiles[newCurrentProfile]?.placeholders || []

    const updatedData = {
      ...letterData,
      companyProfiles: updatedProfiles,
      currentProfile: newCurrentProfile,
      placeholders: defaultPlaceholders,
    }

    setLetterData(updatedData)
    setSelectedCompanyProfile(newCurrentProfile)
  }

  const copyPlaceholder = (placeholderName: string) => {
    navigator.clipboard.writeText(`[${placeholderName}]`)
  }

  const handleSaveEdit = (placeholderId: number) => {
    const placeholder = currentPlaceholders.find((p: Placeholder) => p.id === placeholderId)
    if (placeholder && (!placeholder.name.trim() || !placeholder.value.trim())) {
      removePlaceholder(placeholderId)
    } else {
      setEditingPlaceholder(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 flex-shrink-0" />
              <CardTitle className="text-base sm:text-lg">Dynamic Placeholder System</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog open={showCreatePlaceholderDialog} onOpenChange={setShowCreatePlaceholderDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="flex-shrink-0">
                    <Variable className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Create Variable</span>
                    <span className="sm:hidden">Create</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Dynamic Variable</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="textToReplace">Select text to convert to variable</Label>
                      <Textarea
                        id="textToReplace"
                        value={selectedTextToReplace}
                        onChange={(e) => setSelectedTextToReplace(e.target.value)}
                        placeholder="Paste or type the text you want to make dynamic"
                        className="min-h-[80px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="placeholderName">Variable Name</Label>
                      <Input
                        id="placeholderName"
                        value={newPlaceholderName}
                        onChange={(e) => setNewPlaceholderName(e.target.value)}
                        placeholder="e.g., COMPANY_MISSION"
                        className="font-mono"
                      />
                      {newPlaceholderName && (
                        <p className="text-xs text-gray-500 mt-1">
                          Will create: <code>[{newPlaceholderName.toUpperCase().replace(/[^A-Z0-9_]/g, "_")}]</code>
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowCreatePlaceholderDialog(false)
                          setSelectedTextToReplace("")
                          setNewPlaceholderName("")
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={createPlaceholderFromText} 
                        disabled={!selectedTextToReplace.trim() || !newPlaceholderName.trim()}
                      >
                        Create Variable
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showReplacePlaceholderDialog} onOpenChange={setShowReplacePlaceholderDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="flex-shrink-0">
                    <Replace className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Replace All</span>
                    <span className="sm:hidden">Replace</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Replace All Variable Occurrences</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Select Variable to Replace</Label>
                      <Select 
                        value={selectedPlaceholder?.name || ""} 
                        onValueChange={(value) => {
                          const placeholder = currentPlaceholders.find((p: Placeholder) => p.name === value)
                          setSelectedPlaceholder(placeholder)
                          setReplacementText(placeholder?.value || "")
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a variable" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentPlaceholders.map((placeholder: Placeholder) => (
                            <SelectItem key={placeholder.id} value={placeholder.name}>
                              [{placeholder.name}]
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedPlaceholder && (
                      <>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-medium">Current Value:</Label>
                          <p className="text-sm text-gray-700 mt-1">{selectedPlaceholder.value}</p>
                        </div>
                        
                        <div>
                          <Label htmlFor="replacementText">New Text</Label>
                          <Textarea
                            id="replacementText"
                            value={replacementText}
                            onChange={(e) => setReplacementText(e.target.value)}
                            placeholder="Enter the new text to replace all occurrences"
                            className="min-h-[80px]"
                          />
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowReplacePlaceholderDialog(false)
                          setSelectedPlaceholder(null)
                          setReplacementText("")
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={replaceAllPlaceholderOccurrences} 
                        disabled={!selectedPlaceholder || !replacementText.trim()}
                      >
                        Replace All
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showNewProfileDialog} onOpenChange={setShowNewProfileDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="flex-shrink-0">
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">New Profile</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Company Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="profileName">Profile Name</Label>
                      <Input
                        id="profileName"
                        value={newProfileName}
                        onChange={(e) => setNewProfileName(e.target.value)}
                        placeholder="e.g., Google Application, Microsoft Interview"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowNewProfileDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createNewProfile} disabled={!newProfileName.trim()}>
                        Create Profile
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Select Company Profile</Label>
          <div className="flex gap-2">
            <Select value={selectedCompanyProfile} onValueChange={switchProfile}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(companyProfiles).map(([id, profile]: [string, any]) => (
                  <SelectItem key={id} value={id}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCompanyProfile !== "default" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteProfile(selectedCompanyProfile)}
                className="text-red-600 hover:text-red-700 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Dynamic Variables for "{companyProfiles[selectedCompanyProfile]?.name}"</h4>

          {currentPlaceholders.length > 0 ? (
            <div className="space-y-3">
              {currentPlaceholders.map((placeholder: any) => (
                <div key={placeholder.id} className="border rounded-lg p-4 space-y-3">
                  {editingPlaceholder === placeholder.id ? (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Variable Name</Label>
                        <Input
                          value={placeholder.name}
                          onChange={(e) =>
                            updatePlaceholder(
                              placeholder.id,
                              "name",
                              e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, "_"),
                            )
                          }
                          placeholder="e.g., COMPANY_MISSION"
                          className="text-sm font-mono"
                          autoFocus
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Value</Label>
                        <Textarea
                          value={placeholder.value}
                          onChange={(e) => updatePlaceholder(placeholder.id, "value", e.target.value)}
                          placeholder="e.g., innovation and excellence"
                          className="text-sm min-h-[80px]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <code className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded break-all">
                            [{placeholder.name}]
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyPlaceholder(placeholder.name)}
                            className="h-6 w-6 p-0 flex-shrink-0"
                            title="Copy variable"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingPlaceholder(placeholder.id)}
                            className="h-6 w-6 p-0"
                            title="Edit"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePlaceholder(placeholder.id)}
                            className="h-6 w-6 p-0 text-red-600 hover:text-red-700"  
                            title="Remove variable"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <Label className="text-xs text-gray-600">Current Value:</Label>
                        <p className="mt-1 text-gray-800 break-words">{placeholder.value || "No value set"}</p>
                      </div>
                    </div>
                  )}

                  {editingPlaceholder === placeholder.id && (
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveEdit(placeholder.id)}
                        className="h-6 w-6 p-0"
                        title="Save"
                      >
                        <Save className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
              <Variable className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium mb-1">No dynamic variables yet</p>
              <p className="text-xs mb-4">Create variables to make your cover letter more flexible</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowCreatePlaceholderDialog(true)}
              >
                <Variable className="w-4 h-4 mr-2" />
                Create Your First Variable
              </Button>
            </div>
          )}
        </div>

        {currentPlaceholders.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h5 className="text-sm font-medium text-blue-900 mb-2">How to use variables:</h5>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Click "Create Variable" to turn any text into a reusable placeholder</li>
              <li>• Click "Replace All" to replace all instances of a variable with new text</li>
              <li>• Copy variables and paste them into your content sections</li>
              <li>• Edit variable values to update all instances automatically</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}