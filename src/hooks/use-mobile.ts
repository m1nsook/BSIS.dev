import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribeToViewport(onChange: () => void) {
  const query = window.matchMedia(MEDIA_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function getMobileSnapshot() {
  return window.matchMedia(MEDIA_QUERY).matches
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribeToViewport, getMobileSnapshot, () => false)
}
