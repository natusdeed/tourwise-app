/**
 * Convert hex color to rgba string
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return `rgba(0, 0, 0, ${alpha})`
  
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * Create 3D text shadow effect with lighting
 */
export function create3DTextShadow(color: string, intensity: number = 1): string {
  const colorRgba = (alpha: number) => hexToRgba(color, alpha)
  
  return [
    `0 ${1 * intensity}px 0 ${colorRgba(1)}`,
    `0 ${2 * intensity}px 0 ${colorRgba(0.9)}`,
    `0 ${3 * intensity}px 0 ${colorRgba(0.8)}`,
    `0 ${4 * intensity}px 0 ${colorRgba(0.7)}`,
    `0 ${5 * intensity}px 1px rgba(0, 0, 0, 0.4)`,
    `0 0 ${10 * intensity}px ${colorRgba(0.5)}`,
    `0 ${1 * intensity}px ${3 * intensity}px rgba(0, 0, 0, 0.5)`,
    `0 ${3 * intensity}px ${5 * intensity}px rgba(0, 0, 0, 0.4)`,
    `0 ${5 * intensity}px ${10 * intensity}px ${colorRgba(0.4)}`,
    `0 ${10 * intensity}px ${10 * intensity}px rgba(0, 0, 0, 0.3)`,
    `0 ${20 * intensity}px ${20 * intensity}px ${colorRgba(0.2)}`
  ].join(', ')
}

/**
 * Create 3D text shadow for light/white text
 */
export function create3DLightTextShadow(intensity: number = 1): string {
  return [
    `0 ${1 * intensity}px 0 rgba(255, 255, 255, 0.9)`,
    `0 ${2 * intensity}px 0 rgba(255, 255, 255, 0.7)`,
    `0 ${3 * intensity}px 0 rgba(255, 255, 255, 0.5)`,
    `0 ${4 * intensity}px 0 rgba(255, 255, 255, 0.3)`,
    `0 ${5 * intensity}px 0 rgba(255, 255, 255, 0.1)`,
    `0 ${6 * intensity}px 1px rgba(0, 0, 0, 0.2)`,
    `0 0 ${10 * intensity}px rgba(255, 255, 255, 0.6)`,
    `0 ${1 * intensity}px ${3 * intensity}px rgba(0, 0, 0, 0.3)`,
    `0 ${3 * intensity}px ${5 * intensity}px rgba(0, 0, 0, 0.2)`,
    `0 ${5 * intensity}px ${15 * intensity}px rgba(255, 255, 255, 0.4)`,
    `0 ${10 * intensity}px ${10 * intensity}px rgba(0, 0, 0, 0.2)`,
    `0 ${20 * intensity}px ${20 * intensity}px rgba(255, 255, 255, 0.2)`
  ].join(', ')
}
