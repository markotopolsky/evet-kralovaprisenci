"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useMobileNav } from "@/hooks/useMobileNav";

interface UIContextType {
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  openMobileNav: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const mobileNav = useMobileNav();

  return (
    <UIContext.Provider value={mobileNav}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}




