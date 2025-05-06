"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type LanguageType = "ru" | "en" | "ky"

interface LanguageContextType {
  language: LanguageType
  setLanguage: (lang: LanguageType) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>("ru")

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
