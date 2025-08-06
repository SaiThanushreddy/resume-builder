"use client"

import { useState, useCallback } from "react"

interface UseZoomOptions {
  initialZoom?: number
  minZoom?: number
  maxZoom?: number
  step?: number
}

export function useZoom({ initialZoom = 100, minZoom = 50, maxZoom = 200, step = 25 }: UseZoomOptions = {}) {
  const [zoomLevel, setZoomLevel] = useState(initialZoom)

  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + step, maxZoom))
  }, [step, maxZoom])

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - step, minZoom))
  }, [step, minZoom])

  const resetZoom = useCallback(() => {
    setZoomLevel(initialZoom)
  }, [initialZoom])

  const setZoom = useCallback(
    (zoom: number) => {
      setZoomLevel(Math.max(minZoom, Math.min(maxZoom, zoom)))
    },
    [minZoom, maxZoom],
  )

  return {
    zoomLevel,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
    canZoomIn: zoomLevel < maxZoom,
    canZoomOut: zoomLevel > minZoom,
    isDefaultZoom: zoomLevel === initialZoom,
  }
}
