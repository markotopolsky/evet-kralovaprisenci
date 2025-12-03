"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Stethoscope, 
  Syringe, 
  Scissors, 
  Heart,
  Microscope,
  FlaskConical,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Building2,
  Camera,
  Users,
  Calendar
} from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";
import { urls } from "@/config/urls";

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
        className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium rounded-md transition-colors ${
          isOpen 
            ? "text-[#3C8C80] bg-[#3C8C80]/5" 
            : "text-[#4a4a4a] hover:text-[#3C8C80] hover:bg-[#f8f8f6]"
        }`}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#e8e6e1] py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-start gap-3 px-4 py-3 hover:bg-[#f8f8f6] transition-colors"
            >
              {item.icon && (
                <span className="text-[#3C8C80] mt-0.5 flex-shrink-0">
                  {item.icon}
                </span>
              )}
              <div>
                <span className="block text-[15px] font-medium text-[#2A2A2A]">
                  {item.name}
                </span>
                {item.description && (
                  <span className="block text-[13px] text-[#6b6b6b] mt-0.5">
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

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const otherLanguage = language === "sk" ? "de" : "sk";
  const otherLabel = language === "sk" ? "Deutsch" : "Slovenčina";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium rounded-md transition-colors ${
          isOpen 
            ? "text-[#3C8C80] bg-[#3C8C80]/5" 
            : "text-[#4a4a4a] hover:text-[#3C8C80] hover:bg-[#f8f8f6]"
        }`}
        aria-expanded={isOpen}
      >
        {language.toUpperCase()}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-[#e8e6e1] py-1 z-50">
          <button
            onClick={() => {
              setLanguage(otherLanguage);
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-[15px] font-medium text-[#2A2A2A] hover:bg-[#f8f8f6] transition-colors"
          >
            {otherLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUI();
  const { t, language } = useLanguage();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const servicesItems: DropdownItem[] = [
    { 
      name: language === "sk" ? "Preventívne prehliadky" : "Vorsorgeuntersuchungen", 
      href: "/services/preventivne-prehliadky",
      icon: <Stethoscope className="w-5 h-5" />,
      description: language === "sk" ? "Pravidelné kontroly zdravia" : "Regelmäßige Gesundheitschecks"
    },
    { 
      name: language === "sk" ? "Vakcinácia" : "Impfungen", 
      href: "/services/vakcinacia",
      icon: <Syringe className="w-5 h-5" />,
      description: language === "sk" ? "Očkovanie podľa kalendára" : "Impfung nach Plan"
    },
    { 
      name: language === "sk" ? "Chirurgia" : "Chirurgie", 
      href: "/services/chirurgia",
      icon: <Scissors className="w-5 h-5" />,
      description: language === "sk" ? "Operačné zákroky" : "Operative Eingriffe"
    },
    { 
      name: language === "sk" ? "Stomatológia" : "Zahnmedizin", 
      href: "/services/stomatologia",
      icon: <Heart className="w-5 h-5" />,
      description: language === "sk" ? "Dentálna starostlivosť" : "Zahnpflege"
    },
    { 
      name: language === "sk" ? "Diagnostika" : "Diagnostik", 
      href: "/services/diagnostika",
      icon: <Microscope className="w-5 h-5" />,
      description: language === "sk" ? "Röntgen a USG vyšetrenia" : "Röntgen und Ultraschall"
    },
    { 
      name: language === "sk" ? "Laboratórium" : "Labor", 
      href: "/services/laboratorium",
      icon: <FlaskConical className="w-5 h-5" />,
      description: language === "sk" ? "Krvné testy a analýzy" : "Bluttests und Analysen"
    },
  ];

  const animalsItems: DropdownItem[] = [
    { 
      name: language === "sk" ? "Psy" : "Hunde", 
      href: "/vase-zvieratko/psy",
      icon: <Dog className="w-5 h-5" />,
      description: language === "sk" ? "Starostlivosť o psov" : "Hundepflege"
    },
    { 
      name: language === "sk" ? "Mačky" : "Katzen", 
      href: "/vase-zvieratko/macky",
      icon: <Cat className="w-5 h-5" />,
      description: language === "sk" ? "Starostlivosť o mačky" : "Katzenpflege"
    },
    { 
      name: language === "sk" ? "Hlodavce" : "Nagetiere", 
      href: "/vase-zvieratko/hlodavce",
      icon: <Rabbit className="w-5 h-5" />,
      description: language === "sk" ? "Morčatá, králiky, škrečky" : "Meerschweinchen, Kaninchen"
    },
    { 
      name: language === "sk" ? "Vtáky" : "Vögel", 
      href: "/vase-zvieratko/vtaky",
      icon: <Bird className="w-5 h-5" />,
      description: language === "sk" ? "Papagáje a okrasné vtáky" : "Papageien und Ziervögel"
    },
  ];

  const aboutItems: DropdownItem[] = [
    { 
      name: language === "sk" ? "O klinike" : "Über die Klinik", 
      href: "/about",
      icon: <Building2 className="w-5 h-5" />,
      description: language === "sk" ? "Naša história a hodnoty" : "Unsere Geschichte und Werte"
    },
    { 
      name: language === "sk" ? "Náš tím" : "Unser Team", 
      href: "/about#team",
      icon: <Users className="w-5 h-5" />,
      description: language === "sk" ? "Veterinári a personál" : "Tierärzte und Personal"
    },
    { 
      name: language === "sk" ? "Vybavenie" : "Ausstattung", 
      href: "/about/equipment",
      icon: <Microscope className="w-5 h-5" />,
      description: language === "sk" ? "Moderné diagnostické prístroje" : "Moderne Diagnosegeräte"
    },
    { 
      name: language === "sk" ? "Galéria" : "Galerie", 
      href: "/about/gallery",
      icon: <Camera className="w-5 h-5" />,
      description: language === "sk" ? "Fotografie kliniky" : "Fotos der Klinik"
    },
  ];

  const simpleNavItems = [
    { name: t.nav.home, href: urls.home },
    { name: t.nav.blog, href: urls.blog },
  ];

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="bg-white border-b border-[#e8e6e1] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Hlavná navigácia">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link
            href={urls.home}
            className="flex items-center"
            onClick={() => { closeMobileNav(); closeDropdown(); }}
            aria-label={`${siteConfig.shortName} - Domov`}
          >
            <Image
              src="/logo/logo-small.svg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-auto"
              aria-hidden="true"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <Link
              href={urls.home}
              className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors ${
                pathname === "/"
                  ? "text-[#3C8C80] bg-[#3C8C80]/5"
                  : "text-[#4a4a4a] hover:text-[#3C8C80] hover:bg-[#f8f8f6]"
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu
              label={t.nav.services}
              items={servicesItems}
              isOpen={openDropdown === "services"}
              onToggle={() => handleDropdownToggle("services")}
              onClose={closeDropdown}
            />

            {/* Animals Dropdown */}
            <DropdownMenu
              label={t.nav.animals}
              items={animalsItems}
              isOpen={openDropdown === "animals"}
              onToggle={() => handleDropdownToggle("animals")}
              onClose={closeDropdown}
            />

            {/* About Dropdown */}
            <DropdownMenu
              label={t.nav.about}
              items={aboutItems}
              isOpen={openDropdown === "about"}
              onToggle={() => handleDropdownToggle("about")}
              onClose={closeDropdown}
            />

            {/* Blog */}
            <Link
              href={urls.blog}
              className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors ${
                pathname.startsWith("/blog")
                  ? "text-[#3C8C80] bg-[#3C8C80]/5"
                  : "text-[#4a4a4a] hover:text-[#3C8C80] hover:bg-[#f8f8f6]"
              }`}
            >
              {t.nav.blog}
            </Link>

            <div className="w-px h-6 bg-[#e8e6e1] mx-2" />

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">

            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-[15px] font-medium text-white bg-[#3C8C80] rounded-lg hover:bg-[#2d6b62] transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {t.nav.book}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={`tel:${siteConfig.phone}`}
              className="p-2 text-[#3C8C80]"
              aria-label="Zavolať"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={toggleMobileNav}
              className="p-2 text-[#4a4a4a] hover:text-[#3C8C80] transition-colors"
              aria-label="Menu"
              aria-expanded={isMobileNavOpen}
            >
              {isMobileNavOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="lg:hidden border-t border-[#e8e6e1] bg-white">
          <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-72px)] overflow-y-auto">
            {/* Home */}
            <Link
              href={urls.home}
              onClick={closeMobileNav}
              className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                pathname === "/"
                  ? "text-[#3C8C80] bg-[#3C8C80]/5"
                  : "text-[#2A2A2A] hover:bg-[#f8f8f6]"
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Services Section */}
            <div className="pt-2">
              <p className="px-4 py-2 text-[13px] font-semibold text-[#6b6b6b] uppercase tracking-wide">
                {t.nav.services}
              </p>
              {servicesItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileNav}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] text-[#2A2A2A] hover:bg-[#f8f8f6] transition-colors"
                >
                  <span className="text-[#3C8C80]">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Animals Section */}
            <div className="pt-2">
              <p className="px-4 py-2 text-[13px] font-semibold text-[#6b6b6b] uppercase tracking-wide">
                {t.nav.animals}
              </p>
              {animalsItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileNav}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] text-[#2A2A2A] hover:bg-[#f8f8f6] transition-colors"
                >
                  <span className="text-[#3C8C80]">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* About Section */}
            <div className="pt-2">
              <p className="px-4 py-2 text-[13px] font-semibold text-[#6b6b6b] uppercase tracking-wide">
                {t.nav.about}
              </p>
              {aboutItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileNav}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] text-[#2A2A2A] hover:bg-[#f8f8f6] transition-colors"
                >
                  <span className="text-[#3C8C80]">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Blog */}
            <Link
              href={urls.blog}
              onClick={closeMobileNav}
              className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                pathname.startsWith("/blog")
                  ? "text-[#3C8C80] bg-[#3C8C80]/5"
                  : "text-[#2A2A2A] hover:bg-[#f8f8f6]"
              }`}
            >
              {t.nav.blog}
            </Link>

            {/* Language Switcher Mobile */}
            <div className="pt-4 border-t border-[#e8e6e1]">
              <MobileLanguageSwitcher />
            </div>

            {/* CTA Buttons Mobile */}
            <div className="pt-4 space-y-3">
              <a
                href={`tel:${siteConfig.phone}`}
                onClick={closeMobileNav}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[15px] font-medium text-[#3C8C80] border border-[#3C8C80] rounded-lg"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phone}
              </a>
              <Link
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileNav}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-[15px] font-medium text-white bg-[#3C8C80] rounded-lg"
              >
                <Calendar className="w-4 h-4" />
                {t.nav.bookOnline}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 px-4">
      <button
        onClick={() => setLanguage("sk")}
        className={`flex-1 py-2.5 text-[15px] font-medium rounded-lg transition-colors ${
          language === "sk"
            ? "bg-[#3C8C80]/10 text-[#3C8C80]"
            : "bg-[#f8f8f6] text-[#4a4a4a] hover:bg-[#f0f0ec]"
        }`}
      >
        Slovenčina
      </button>
      <button
        onClick={() => setLanguage("de")}
        className={`flex-1 py-2.5 text-[15px] font-medium rounded-lg transition-colors ${
          language === "de"
            ? "bg-[#3C8C80]/10 text-[#3C8C80]"
            : "bg-[#f8f8f6] text-[#4a4a4a] hover:bg-[#f0f0ec]"
        }`}
      >
        Deutsch
      </button>
    </div>
  );
}
