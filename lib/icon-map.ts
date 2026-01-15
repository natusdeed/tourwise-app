/**
 * Icon Mapping Utility
 * 
 * Maps icon name strings to actual Lucide React icon components
 */
import * as LucideIcons from 'lucide-react'

export type IconName = keyof typeof LucideIcons

/**
 * Get icon component by name string
 */
export function getIconByName(iconName: string): LucideIcons.LucideIcon {
  // Default to Sparkles if icon not found
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Sparkles
  return Icon
}
