import { Badge } from "@/components/ui/badge"

interface CoverLetterPreviewProps {
  letterData: any
  zoomLevel: number
}

export function CoverLetterPreview({ letterData, zoomLevel }: CoverLetterPreviewProps) {
  const replacePlaceholders = (text: string): string => {
    if (!text) return text

    let processedText = text

    processedText = processedText
      .replace(/\[COMPANY\]/g, letterData.company.name || "[COMPANY]")
      .replace(/\[POSITION\]/g, letterData.company.position || "[POSITION]")
      .replace(/\[HIRING_MANAGER\]/g, letterData.company.hiringManager || "[HIRING_MANAGER]")
      .replace(/\[YOUR_NAME\]/g, letterData.personal.fullName || "[YOUR_NAME]")

    if (letterData.placeholders && letterData.placeholders.length > 0) {
      letterData.placeholders.forEach((placeholder: any) => {
        if (placeholder.name && placeholder.value) {
          const regex = new RegExp(`\\[${placeholder.name}\\]`, "g")
          processedText = processedText.replace(regex, placeholder.value)
        }
      })
    }

    return processedText
  }



  return (
    <div className="w-full h-[80vh] flex items-center justify-center p-6">
      <div className="rounded-lg p-6 mb-6 shadow-sm overflow-hidden">
      
        <div
          className="bg-white shadow-lg"
          style={{
            width: '595px',
            height: '700px',
            overflowX: zoomLevel === 100 ? 'hidden' : 'auto',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top left',
              width: `${Math.min(10000 / zoomLevel, 100)}%`,
              height: 'max-content',
            }}
          >
            <div
              className="bg-white relative"
              style={{
                width: '595px',
                minHeight: '842px',
                fontFamily: 'Georgia, "Times New Roman", Times, serif',
                fontSize: '14px',
                lineHeight: '1.4',
                color: '#1a1a1a'
              }}
            >
              <div className="px-16 py-12">
                <div className="space-y-6">
                  <div className="text-right">
                    <div className="font-semibold">{letterData.personal.fullName || "Your Name"}</div>
                    {letterData.personal.address && <div>{letterData.personal.address}</div>}
                    {letterData.personal.phone && <div>{letterData.personal.phone}</div>}
                    {letterData.personal.email && <div>{letterData.personal.email}</div>}
                  </div>

                  <div className="text-right">
                    <div>{letterData.date}</div>
                  </div>

                  {(letterData.company.hiringManager || letterData.company.name || letterData.company.address) && (
                    <div>
                      {letterData.company.hiringManager && <div>{letterData.company.hiringManager}</div>}
                      {letterData.company.name && <div>{letterData.company.name}</div>}
                      {letterData.company.address && <div>{letterData.company.address}</div>}
                    </div>
                  )}

                  <div>
                    {letterData.company.hiringManager
                      ? `Dear ${letterData.company.hiringManager},`
                      : "Dear Hiring Manager,"}
                  </div>

                  <div className="space-y-4">
                    {letterData.content.opening && (
                      <p className="text-justify">{replacePlaceholders(letterData.content.opening)}</p>
                    )}

                    {letterData.content.body && (
                      <div className="space-y-4">
                        {letterData.content.body.split("\n\n").map((paragraph: string, index: number) => (
                          <p key={index} className="text-justify">
                            {replacePlaceholders(paragraph)}
                          </p>
                        ))}
                      </div>
                    )}

                    {letterData.content.closing && (
                      <p className="text-justify">{replacePlaceholders(letterData.content.closing)}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <div>Sincerely,</div>
                    <div className="mt-8 font-semibold">{letterData.personal.fullName || "Your Name"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}