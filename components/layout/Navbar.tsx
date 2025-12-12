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
  Newspaper,
  Microscope
} from "lucide-react";
import { useUI } from "@/context/UIContext";
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
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-[#e8e6e1] py-2 z-50 max-h-[70vh] overflow-y-auto">
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

export function Navbar() {
  const pathname = usePathname();
  const { isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUI();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const servicesItems: DropdownItem[] = [
    { 
      name: "Interná medicína", 
      href: urls.service("interna-medicina"),
      icon: <Stethoscope className="w-5 h-5" />,
      description: "Komplexné vyšetrenia"
    },
    { 
      name: "Krvné vyšetrenia", 
      href: urls.service("krvne-vysetrenia"),
      icon: <Droplet className="w-5 h-5" />,
      description: "Hematológia a biochémia"
    },
    { 
      name: "USG vyšetrenie", 
      href: urls.service("usg-vysetrenie"),
      icon: <Waves className="w-5 h-5" />,
      description: "Ultrazvukové zobrazenie"
    },
    { 
      name: "RTG diagnostika", 
      href: urls.service("rtg-diagnostika"),
      icon: <Bone className="w-5 h-5" />,
      description: "Digitálna rádiografia"
    },
    { 
      name: "Chirurgia", 
      href: urls.service("chirurgia"),
      icon: <Bandage className="w-5 h-5" />,
      description: "Operačné zákroky"
    },
    { 
      name: "Plastika podnebia", 
      href: urls.service("plastika-podnebia"),
      icon: <Dog className="w-5 h-5" />,
      description: "BOAS syndróm"
    },
    { 
      name: "Dentálna hygiena", 
      href: urls.service("dentalna-hygiena"),
      icon: <Smile className="w-5 h-5" />,
      description: "Starostlivosť o chrup"
    },
    { 
      name: "PHOVIA terapia", 
      href: urls.service("phovia-terapia"),
      icon: <Sun className="w-5 h-5" />,
      description: "Svetelná liečba kože"
    },
    { 
      name: "Hospitalizácia 24H", 
      href: urls.service("hospitalizacia"),
      icon: <Hospital className="w-5 h-5" />,
      description: "Nepretržitá starostlivosť"
    },
    { 
      name: "Pohotovosť", 
      href: urls.service("pohotovost"),
      icon: <Ambulance className="w-5 h-5" />,
      description: "Urgentná pomoc"
    },
    { 
      name: "Krmivá a doplnky", 
      href: urls.service("krmiva-doplnky"),
      icon: <ShoppingBag className="w-5 h-5" />,
      description: "Veterinárna výživa"
    },
    { 
      name: "Konzultácie", 
      href: urls.service("konzultacie"),
      icon: <MessageCircle className="w-5 h-5" />,
      description: "Osobné poradenstvo"
    },
  ];

  const animalsItems: DropdownItem[] = [
    { 
      name: "Psy", 
      href: "/vase-zvieratko/psy",
      icon: <Dog className="w-5 h-5" />,
      description: "Starostlivosť o psov"
    },
    { 
      name: "Mačky", 
      href: "/vase-zvieratko/macky",
      icon: <Cat className="w-5 h-5" />,
      description: "Starostlivosť o mačky"
    },
    { 
      name: "Hlodavce", 
      href: "/vase-zvieratko/hlodavce",
      icon: <Rabbit className="w-5 h-5" />,
      description: "Morčatá, králiky, škrečky"
    },
    { 
      name: "Aktuality", 
      href: "/vase-zvieratko/aktuality",
      icon: <Newspaper className="w-5 h-5" />,
      description: "Novinky a dôležité informácie"
    },
  ];

  const aboutItems: DropdownItem[] = [
    { 
      name: "O klinike", 
      href: urls.about,
      icon: <Building2 className="w-5 h-5" />,
      description: "Naša história a hodnoty"
    },
    { 
      name: "Náš tím", 
      href: `${urls.about}#team`,
      icon: <Users className="w-5 h-5" />,
      description: "Veterinári a personál"
    },
    { 
      name: "Vybavenie", 
      href: urls.equipment,
      icon: <Microscope className="w-5 h-5" />,
      description: "Moderné diagnostické prístroje"
    },
    { 
      name: "Galéria", 
      href: urls.gallery,
      icon: <Camera className="w-5 h-5" />,
      description: "Fotografie kliniky"
    },
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
              Domov
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu
              label="Služby"
              items={servicesItems}
              isOpen={openDropdown === "services"}
              onToggle={() => handleDropdownToggle("services")}
              onClose={closeDropdown}
            />

            {/* Animals Dropdown */}
            <DropdownMenu
              label="Vaše zvieratko"
              items={animalsItems}
              isOpen={openDropdown === "animals"}
              onToggle={() => handleDropdownToggle("animals")}
              onClose={closeDropdown}
            />

            {/* About Dropdown */}
            <DropdownMenu
              label="O nás"
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
              Blog
            </Link>
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
              Objednať sa
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-[#3C8C80] rounded-lg hover:bg-[#2d6b62] transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Objednať sa</span>
            </Link>
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
              Domov
            </Link>

            {/* Services Section */}
            <div className="pt-2">
              <p className="px-4 py-2 text-[13px] font-semibold text-[#6b6b6b] uppercase tracking-wide">
                Služby
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
                Vaše zvieratko
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
                O nás
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
              Blog
            </Link>

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
                Objednať sa online
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
