"use client"

import { useState } from "react"
import styles from "./country-list.module.scss"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/translations"
import { Search } from "lucide-react"

interface CountryListProps {
  countries: any[]
  onSelectCountry: (country: any) => void
  selectedCountry: any
}

export default function CountryList({ countries, onSelectCountry, selectedCountry }: CountryListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { language } = useLanguage()
  const t = translations[language]

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className={styles.listContainer}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={18} />
        <input
          type="text"
          placeholder={t.searchCountry}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.list}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              key={country.cca3}
              className={`${styles.countryItem} ${selectedCountry?.cca3 === country.cca3 ? styles.selected : ""}`}
              onClick={() => onSelectCountry(country)}
            >
              <div className={styles.flagSmall}>
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={`Флаг ${country.name.common}`}
                  width={24}
                  height={16}
                />
              </div>
              <span>{country.name.common}</span>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>{t.noCountriesFound}</div>
        )}
      </div>
    </div>
  )
}
