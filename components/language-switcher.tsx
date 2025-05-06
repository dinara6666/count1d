"use client"

import { useState, useRef, useEffect } from "react"
import styles from "./language-switcher.module.scss"
import { useLanguage } from "@/context/language-context"
import { ChevronDown } from "lucide-react"

const languages = [
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ky", name: "Кыргызча", flag: "🇰🇬" },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLanguage = languages.find((lang) => lang.code === language)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button className={styles.currentLanguage} onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}>
        <span className={styles.flag}>{currentLanguage?.flag}</span>
        <span className={styles.name}>{currentLanguage?.name}</span>
        <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.languageOption} ${lang.code === language ? styles.active : ""}`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.name}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
