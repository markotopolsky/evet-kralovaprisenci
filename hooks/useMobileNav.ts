"use client";

import { useState, useCallback } from "react";

export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isMobileNavOpen: isOpen,
    toggleMobileNav: toggle,
    closeMobileNav: close,
    openMobileNav: open,
  };
}








