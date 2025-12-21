"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, X, ChevronDown, Calendar, Building2, Users, Microscope, Camera, 
  Dog, Cat, Rabbit, Newspaper, Stethoscope, Droplet, Radio, Bone, 
  Scissors, Smile, Siren, ShoppingBag
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { siteConfig } from "@/config/site";
import { urls } from "@/config/urls";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

interface DropdownItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface MobileDropdownProps {
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: () => void;
}

// =============================================================================
// STYLES (using CSS variables from globals.css)
// =============================================================================

const styles = {
  navLink: "px-3 py-2 text-[15px] font-medium rounded-md transition-colors",
  navLinkActive: "text-primary bg-primary/5",
  navLinkInactive: "text-text-light hover:text-primary hover:bg-bg-light",
  mobileNavLink: "block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors",
  ctaButton: "flex items-center gap-2 px-4 py-2.5 text-[15px] font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors",
  ctaButtonMobile: "flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors",
  dropdownPanel: "absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-border py-2 z-50 max-h-[70vh] overflow-y-auto",
  dropdownItem: "flex items-start gap-3 px-4 py-3 hover:bg-bg-light transition-colors",
} as const;

// =============================================================================
// DESKTOP DROPDOWN MENU COMPONENT
// =============================================================================

function DropdownMenu({ label, items, isOpen, onToggle, onClose }: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={cn(
          styles.navLink,
          "flex items-center gap-1.5",
          isOpen ? styles.navLinkActive : styles.navLinkInactive
        )}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownPanel}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={styles.dropdownItem}
            >
              {item.icon && (
                <span className="text-primary mt-0.5 flex-shrink-0">
                  {item.icon}
                </span>
              )}
              <div>
                <span className="block text-[15px] font-medium text-text">
                  {item.name}
                </span>
                {item.description && (
                  <span className="block text-[13px] text-text-light mt-0.5">
                    {item.description}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// MOBILE DROPDOWN MENU COMPONENT
// =============================================================================

function MobileDropdown({ label, items, isOpen, onToggle, onItemClick }: MobileDropdownProps) {
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 text-[15px] font-medium text-text hover:bg-bg-light transition-colors rounded-lg"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={cn("w-5 h-5 text-text-light transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-4 pb-2 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] text-text-light hover:text-text hover:bg-bg-light transition-colors"
            >
              {item.icon && (
                <span className="text-primary flex-shrink-0">
                  {item.icon}
                </span>
              )}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN NAVBAR COMPONENT
// =============================================================================

export function Navbar() {
  const pathname = usePathname();
  const { isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUI();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  // Services dropdown items
  const servicesItems: DropdownItem[] = [
    {
      name: "Všetky služby",
      href: urls.services,
      icon: <Stethoscope className="w-5 h-5" />,
      description: "Kompletný prehľad služieb",
    },
    {
      name: "Interná medicína",
      href: urls.service("interna-medicina"),
      icon: <Stethoscope className="w-5 h-5" />,
      description: "Vyšetrenia a diagnostika",
    },
    {
      name: "Krvné vyšetrenia",
      href: urls.service("krvne-vysetrenia"),
      icon: <Droplet className="w-5 h-5" />,
      description: "Hematológia a biochémia",
    },
    {
      name: "USG vyšetrenie",
      href: urls.service("usg-vysetrenie"),
      icon: <Radio className="w-5 h-5" />,
      description: "Ultrazvuková diagnostika",
    },
    {
      name: "RTG diagnostika",
      href: urls.service("rtg-diagnostika"),
      icon: <Bone className="w-5 h-5" />,
      description: "Digitálna rádiografia",
    },
    {
      name: "Chirurgia",
      href: urls.service("chirurgia"),
      icon: <Scissors className="w-5 h-5" />,
      description: "Operačné zákroky",
    },
    {
      name: "Dentálna hygiena",
      href: urls.service("dentalna-hygiena"),
      icon: <Smile className="w-5 h-5" />,
      description: "Starostlivosť o chrup",
    },
    {
      name: "Pohotovosť",
      href: urls.service("pohotovost"),
      icon: <Siren className="w-5 h-5" />,
      description: "Urgentná starostlivosť 24/7",
    },
    {
      name: "Krmivá a doplnky",
      href: urls.service("krmiva-doplnky"),
      icon: <ShoppingBag className="w-5 h-5" />,
      description: "Veterinárne diéty",
    },
  ];

  // Animals section dropdown items (removed the overview option)
  const animalsItems: DropdownItem[] = [
    {
      name: "Psy",
      href: urls.animalType("psy"),
      icon: <Dog className="w-5 h-5" />,
      description: "Starostlivosť o psov",
    },
    {
      name: "Mačky",
      href: urls.animalType("macky"),
      icon: <Cat className="w-5 h-5" />,
      description: "Starostlivosť o mačky",
    },
    {
      name: "Hlodavce",
      href: urls.animalType("hlodavce"),
      icon: <Rabbit className="w-5 h-5" />,
      description: "Králiky, morčatá a iné",
    },
    {
      name: "Aktuality",
      href: urls.aktuality,
      icon: <Newspaper className="w-5 h-5" />,
      description: "Varovania a novinky",
    },
  ];

  // About section dropdown items
  const aboutItems: DropdownItem[] = [
    {
      name: "O klinike",
      href: urls.about,
      icon: <Building2 className="w-5 h-5" />,
      description: "Naša história a hodnoty",
    },
    {
      name: "Náš tím",
      href: `${urls.about}#team`,
      icon: <Users className="w-5 h-5" />,
      description: "Veterinári a personál",
    },
    {
      name: "Vybavenie",
      href: urls.equipment,
      icon: <Microscope className="w-5 h-5" />,
      description: "Moderné diagnostické prístroje",
    },
    {
      name: "Galéria",
      href: urls.gallery,
      icon: <Camera className="w-5 h-5" />,
      description: "Fotografie kliniky",
    },
  ];

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const handleMobileDropdownToggle = (dropdown: string) => {
    setOpenMobileDropdown(openMobileDropdown === dropdown ? null : dropdown);
  };

  const handleMobileItemClick = () => {
    closeMobileNav();
    setOpenMobileDropdown(null);
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Hlavná navigácia"
      >
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link
            href={urls.home}
            className="flex items-center"
            onClick={() => {
              closeMobileNav();
              closeDropdown();
            }}
            aria-label={`${siteConfig.shortName} - Domov`}
          >
            <Image
              src="/logo/logo-small.svg"
              alt=""
              width={200}
              height={200}
              className="h-40 w-40 sm:h-44 sm:w-44 lg:h-48 lg:w-48 shrink-0"
              aria-hidden="true"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href={urls.home}
              className={cn(
                styles.navLink,
                isActive("/") && pathname === "/" ? styles.navLinkActive : styles.navLinkInactive
              )}
            >
              Domov
            </Link>

            <DropdownMenu
              label="Služby"
              items={servicesItems}
              isOpen={openDropdown === "services"}
              onToggle={() => handleDropdownToggle("services")}
              onClose={closeDropdown}
            />

            <DropdownMenu
              label="Vaše zvieratko"
              items={animalsItems}
              isOpen={openDropdown === "animals"}
              onToggle={() => handleDropdownToggle("animals")}
              onClose={closeDropdown}
            />

            <DropdownMenu
              label="O nás"
              items={aboutItems}
              isOpen={openDropdown === "about"}
              onToggle={() => handleDropdownToggle("about")}
              onClose={closeDropdown}
            />

            <Link
              href={urls.blog}
              className={cn(
                styles.navLink,
                isActive("/blog") ? styles.navLinkActive : styles.navLinkInactive
              )}
            >
              Blog
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <Calendar className="w-4 h-4" />
              Objednať sa
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButtonMobile}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Objednať sa</span>
            </Link>
            <button
              onClick={toggleMobileNav}
              className="p-2 text-text-light hover:text-primary transition-colors"
              aria-label="Menu"
              aria-expanded={isMobileNavOpen}
            >
              {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-72px)] overflow-y-auto">
            <Link
              href={urls.home}
              onClick={handleMobileItemClick}
              className={cn(
                styles.mobileNavLink,
                isActive("/") && pathname === "/"
                  ? styles.navLinkActive
                  : "text-text hover:bg-bg-light"
              )}
            >
              Domov
            </Link>

            {/* Services Dropdown */}
            <MobileDropdown
              label="Služby"
              items={servicesItems}
              isOpen={openMobileDropdown === "services"}
              onToggle={() => handleMobileDropdownToggle("services")}
              onItemClick={handleMobileItemClick}
            />

            {/* Animals Dropdown */}
            <MobileDropdown
              label="Vaše zvieratko"
              items={animalsItems}
              isOpen={openMobileDropdown === "animals"}
              onToggle={() => handleMobileDropdownToggle("animals")}
              onItemClick={handleMobileItemClick}
            />

            {/* About Dropdown */}
            <MobileDropdown
              label="O nás"
              items={aboutItems}
              isOpen={openMobileDropdown === "about"}
              onToggle={() => handleMobileDropdownToggle("about")}
              onItemClick={handleMobileItemClick}
            />

            <Link
              href={urls.blog}
              onClick={handleMobileItemClick}
              className={cn(
                styles.mobileNavLink,
                isActive("/blog") ? styles.navLinkActive : "text-text hover:bg-bg-light"
              )}
            >
              Blog
            </Link>

            {/* CTA Buttons Mobile */}
            <div className="pt-4 space-y-3">
              <Link
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMobileItemClick}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[15px] font-medium text-white bg-primary rounded-lg"
              >
                <Calendar className="w-4 h-4" />
                Objednať sa online
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
