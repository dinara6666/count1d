"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import styles from "./theme-switcher.module.scss"
import { Sun, Moon } from "lucide-react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      className={styles.themeSwitcher}
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Переключить на светлую тему" : "Переключить на темную тему"}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
