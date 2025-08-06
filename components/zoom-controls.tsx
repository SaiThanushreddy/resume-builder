"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface ZoomControlsProps {
  zoomLevel: number
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  minZoom?: number
  maxZoom?: number
}

export function ZoomControls({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  minZoom = 50,
  maxZoom = 200,
}: ZoomControlsProps) {
  return (
    <div className="flex items-center space-x-2 border rounded-lg p-1 bg-white shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onZoomOut}
        disabled={zoomLevel <= minZoom}
        className="h-8 w-8 p-0"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>

      <div className="text-sm font-medium px-3 py-1 min-w-[60px] text-center bg-gray-50 rounded">{zoomLevel}%</div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onZoomIn}
        disabled={zoomLevel >= maxZoom}
        className="h-8 w-8 p-0"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onResetZoom}
        disabled={zoomLevel === 100}
        className="h-8 w-8 p-0"
        title="Reset Zoom"
      >
        <RotateCcw className="w-3 h-3" />
      </Button>
    </div>
  )
}
