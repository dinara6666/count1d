"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.scss"
import CountryList from "@/components/country-list"
import CountryInfo from "@/components/country-info"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeSwitcher from "@/components/theme-switcher"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/translations"
import { Globe } from "lucide-react"

export default function Home() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all")
        const data = await response.json()
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountries(sortedCountries)
        setLoading(false)
      } catch (error) {
        console.error("Ошибка при загрузке стран:", error)
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Globe className={styles.logoIcon} />
          <h1 className={styles.title}>{t.appTitle}</h1>
        </div>
        <div className={styles.controls}>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <h2>{t.countriesList}</h2>
          {loading ? (
            <div className={styles.loader}>
              <div className={styles.spinner}></div>
              <p>{t.loading}</p>
            </div>
          ) : (
            <CountryList
              countries={countries}
              onSelectCountry={handleCountrySelect}
              selectedCountry={selectedCountry}
            />
          )}
        </div>
        <div className={styles.rightPanel}>
          {selectedCountry ? (
            <CountryInfo country={selectedCountry} allCountries={countries} />
          ) : (
            <div className={styles.noSelection}>
              <Globe size={80} className={styles.globeIcon} />
              <p>{t.selectCountry}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
