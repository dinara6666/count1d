"use client"

import Image from "next/image"
import styles from "./country-info.module.scss"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/translations"
import { MapPin, Users, Globe2, SquareIcon as SquareMeter, Languages, Coins } from "lucide-react"

interface CountryInfoProps {
  country: any
  allCountries: any[]
}

export default function CountryInfo({ country, allCountries }: CountryInfoProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const getBorderCountries = () => {
    if (!country.borders || country.borders.length === 0) {
      return [t.noBorderingCountries]
    }

    return country.borders.map((border) => {
      const borderCountry = allCountries.find((c) => c.cca3 === border)
      return borderCountry ? borderCountry.name.common : border
    })
  }

  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat(language === "en" ? "en-US" : "ru-RU").format(population)
  }

  const getLanguages = () => {
    if (!country.languages) return t.noData

    return Object.values(country.languages).join(", ")
  }

  const borderCountries = getBorderCountries()

  return (
    <div className={styles.infoContainer}>
      <div className={styles.countryHeader}>
        <h1 className={styles.countryName}>{country.name.common}</h1>
        {country.name.nativeName && Object.values(country.name.nativeName)[0] && (
          <div className={styles.nativeName}>{Object.values(country.name.nativeName)[0].common}</div>
        )}
      </div>

      <div className={styles.flagContainer}>
        <Image
          src={country.flags.svg || country.flags.png}
          alt={`${t.flagOf} ${country.name.common}`}
          width={400}
          height={200}
          className={styles.flag}
        />
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <MapPin size={20} />
          </div>
          <div>
            <h3>{t.capital}:</h3>
            <p>{country.capital?.[0] || t.noData}</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <Users size={20} />
          </div>
          <div>
            <h3>{t.population}:</h3>
            <p>
              {formatPopulation(country.population)} {t.people}
            </p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <Globe2 size={20} />
          </div>
          <div>
            <h3>{t.region}:</h3>
            <p>{country.region || t.noData}</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <SquareMeter size={20} />
          </div>
          <div>
            <h3>{t.area}:</h3>
            <p>{country.area ? `${formatPopulation(country.area)} ${t.squareKm}` : t.noData}</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <Languages size={20} />
          </div>
          <div>
            <h3>{t.languages}:</h3>
            <p>{getLanguages()}</p>
          </div>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <Coins size={20} />
          </div>
          <div>
            <h3>{t.currencies}:</h3>
            <p>
              {country.currencies
                ? Object.values(country.currencies)
                    .map((c) => `${c.name} (${c.symbol})`)
                    .join(", ")
                : t.noData}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bordersSection}>
        <h3>{t.bordersWith}:</h3>
        <ul className={styles.bordersList}>
          {borderCountries.map((borderName, index) => (
            <li key={index} className={styles.borderItem}>
              {borderName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
