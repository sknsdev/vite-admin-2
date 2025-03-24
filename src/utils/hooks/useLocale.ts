import { useEffect, useContext } from 'react'
// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import dayjs from 'dayjs'
import { dateLocales } from '@/locales'
import { StoreContext } from '@/contexts/StoreContext'

function useLocale() {
  const { localeStore } = useContext(StoreContext)
  const locale = localeStore.currentLocale

  useEffect(() => {
    const formattedLang = locale.replace(/-([a-z])/g, function (g:any) {
      return g[1].toUpperCase()
    })
    if (locale !== i18n.language) {
      i18n.changeLanguage(formattedLang)
    }
    dateLocales[formattedLang]().then(() => {
      dayjs.locale(formattedLang)
    })
  }, [locale])

  return locale
}

export default useLocale
