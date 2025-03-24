import { AuthStore } from './AuthStore'
import { ThemeStore } from './ThemeStore'
import { LocaleStore } from './LocaleStore'
import { makeAutoObservable } from 'mobx'

export class BaseStore {
  currentRouteKey: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentRouteKey(key: string) {
    this.currentRouteKey = key
  }
}

export class RootStore {
  authStore: AuthStore
  themeStore: ThemeStore
  localeStore: LocaleStore
  baseStore: BaseStore

  constructor() {
    this.authStore = new AuthStore()
    this.themeStore = new ThemeStore()
    this.localeStore = new LocaleStore()
    this.baseStore = new BaseStore()
    makeAutoObservable(this)
  }
}

export const rootStore = new RootStore()