/**
 * Icon Mappings
 * 
 * Centralized icon configuration for consistent usage across the application.
 * This prevents duplicate icon mapping definitions in multiple components.
 */

import {
  Stethoscope,
  Droplet,
  Waves,
  Bone,
  Bandage,
  Dog,
  Smile,
  Sun,
  Hospital,
  Ambulance,
  ShoppingBag,
  MessageCircle,
  Cat,
  Rabbit,
  Building2,
  Camera,
  Users,
  Calendar,
  Microscope,
  Phone,
  Mail,
  MapPin,
  Clock,
  Clock3,
  CalendarClock,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Facebook,
  CheckCircle,
  HeartHandshake,
  Info,
  PawPrint,
  Heart,
  Handshake,
  Sprout,
  Home,
  HelpCircle,
  Gift,
  FileText,
  Star,
  Syringe,
  Inbox,
  Newspaper,
  Bird,
  CircleDollarSign,
  type LucideIcon,
} from "lucide-react";

// =============================================================================
// SERVICE ICONS
// =============================================================================

/**
 * Maps service icon names (from database) to Lucide icon components.
 * Used in ServicesList, ServicesPreview, and related components.
 */
export const serviceIcons: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  droplet: Droplet,
  waves: Waves,
  bone: Bone,
  bandage: Bandage,
  dog: Dog,
  smile: Smile,
  sun: Sun,
  hospital: Hospital,
  ambulance: Ambulance,
  "shopping-bag": ShoppingBag,
  "message-circle": MessageCircle,
} as const;

/**
 * Get icon component by name with fallback
 */
export function getServiceIcon(iconName?: string): LucideIcon | null {
  if (!iconName) return null;
  return serviceIcons[iconName] || null;
}

// =============================================================================
// ANIMAL TYPE ICONS
// =============================================================================

export const animalIcons: Record<string, LucideIcon> = {
  dog: Dog,
  cat: Cat,
  rabbit: Rabbit,
} as const;

// =============================================================================
// NAVIGATION ICONS
// =============================================================================

export const navIcons = {
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  calendar: Calendar,
  phone: Phone,
} as const;

// =============================================================================
// ABOUT SECTION ICONS
// =============================================================================

export const aboutDropdownIcons = {
  clinic: Building2,
  team: Users,
  equipment: Microscope,
  gallery: Camera,
} as const;

// =============================================================================
// FEATURE ICONS
// =============================================================================

export const featureIcons = {
  building: Building2,
  users: Users,
  heartHandshake: HeartHandshake,
  clock: Clock3,
  info: Info,
} as const;

// =============================================================================
// CONTACT ICONS
// =============================================================================

export const contactIcons = {
  phone: Phone,
  mail: Mail,
  mapPin: MapPin,
  clock: Clock,
  external: ExternalLink,
  facebook: Facebook,
  calendarClock: CalendarClock,
} as const;

// =============================================================================
// UI ICONS
// =============================================================================

export const uiIcons = {
  checkCircle: CheckCircle,
  chevronDown: ChevronDown,
  close: X,
  pawPrint: PawPrint,
  helpCircle: HelpCircle,
  star: Star,
  gift: Gift,
  fileText: FileText,
} as const;

// =============================================================================
// VALUE/SECTION BADGE ICONS
// =============================================================================

export const badgeIcons = {
  pawPrint: PawPrint,
  hospital: Hospital,
  users: Users,
  gift: Gift,
  fileText: FileText,
  star: Star,
  helpCircle: HelpCircle,
  info: Info,
  heart: Heart,
} as const;

// =============================================================================
// WHY WE DO IT VALUE ICONS
// =============================================================================

export const valueIcons: Record<string, LucideIcon> = {
  heart: Heart,
  handshake: Handshake,
  sprout: Sprout,
  home: Home,
} as const;

// =============================================================================
// ANIMAL ICONS (for animal types list)
// =============================================================================

export const animalTypeIcons: Record<string, LucideIcon> = {
  psy: Dog,
  macky: Cat,
  hlodavce: Rabbit,
  vtaky: Bird,
  default: PawPrint,
} as const;

// =============================================================================
// PAGE BADGE ICONS
// =============================================================================

export const pageBadgeIcons = {
  info: Info,
  users: Users,
  hospital: Hospital,
  camera: Camera,
  phone: Phone,
  pricing: CircleDollarSign,
  blog: FileText,
  news: Newspaper,
  pawPrint: PawPrint,
  gift: Gift,
} as const;

// =============================================================================
// RE-EXPORTS FOR CONVENIENCE
// =============================================================================

export {
  Stethoscope,
  Droplet,
  Waves,
  Bone,
  Bandage,
  Dog,
  Smile,
  Sun,
  Hospital,
  Ambulance,
  ShoppingBag,
  MessageCircle,
  Cat,
  Rabbit,
  Building2,
  Camera,
  Users,
  Calendar,
  Microscope,
  Phone,
  Mail,
  MapPin,
  Clock,
  Clock3,
  CalendarClock,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Facebook,
  CheckCircle,
  HeartHandshake,
  Info,
  PawPrint,
  Heart,
  Handshake,
  Sprout,
  Home,
  HelpCircle,
  Gift,
  FileText,
  Star,
  Syringe,
  Inbox,
  Newspaper,
  Bird,
  CircleDollarSign,
};

export type { LucideIcon };

