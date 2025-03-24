import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export class LocaleStore {
  currentLocale: string = 'en'

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'LocaleStore',
      properties: ['currentLocale'],
      storage: window.localStorage,
    })
  }

  setLocale(locale: string) {
    this.currentLocale = locale
  }
}