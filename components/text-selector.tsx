"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tag, Plus } from "lucide-react"

interface TextSelectorProps {
  content: string
  onContentChange: (content: string) => void
  onPlaceholderCreate: (name: string, value: string) => void
  fieldName: string
}

export function TextSelector({ content, onContentChange, onPlaceholderCreate, fieldName }: TextSelectorProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [placeholderName, setPlaceholderName] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextSelection = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.substring(start, end)

    if (selected.trim()) {
      setSelectedText(selected.trim())
      setPlaceholderName(
        selected
          .trim()
          .toUpperCase()
          .replace(/[^A-Z0-9\s]/g, "")
          .replace(/\s+/g, "_")
          .substring(0, 20),
      )
      setShowCreateDialog(true)
    }
  }

  const createPlaceholder = () => {
    if (!placeholderName.trim() || !selectedText.trim()) return

    // Create the placeholder
    onPlaceholderCreate(placeholderName, selectedText)

    // Replace selected text with placeholder in content
    const placeholder = `[${placeholderName}]`
    const newContent = content.replace(selectedText, placeholder)
    onContentChange(newContent)

    // Reset state
    setSelectedText("")
    setPlaceholderName("")
    setShowCreateDialog(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={fieldName}>{fieldName}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleTextSelection}
          className="text-xs"
          title="Select text first, then click to create placeholder"
        >
          <Tag className="w-3 h-3 mr-1" />
          Create Placeholder
        </Button>
      </div>

      <textarea
        ref={textareaRef}
        id={fieldName}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={fieldName === "body" ? 6 : 3}
        placeholder={`Write your ${fieldName} here. Select text and click 'Create Placeholder' to make it reusable.`}
      />

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Placeholder from Selected Text</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Selected Text</Label>
              <div className="p-3 bg-gray-50 rounded border text-sm">{selectedText}</div>
            </div>
            <div>
              <Label htmlFor="placeholderName">Placeholder Name</Label>
              <Input
                id="placeholderName"
                value={placeholderName}
                onChange={(e) =>
                  setPlaceholderName(
                    e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9_]/g, "_")
                      .substring(0, 30),
                  )
                }
                placeholder="COMPANY_MISSION"
                className="font-mono"
              />
              <p className="text-xs text-gray-500 mt-1">Will be used as: [{placeholderName}]</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={createPlaceholder} disabled={!placeholderName.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                Create Placeholder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
