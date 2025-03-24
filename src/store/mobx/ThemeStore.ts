import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export class ThemeStore {
  currentTheme: string = 'light'

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'ThemeStore',
      properties: ['currentTheme'],
      storage: window.localStorage,
    })
  }

  setTheme(theme: string) {
    this.currentTheme = theme
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
  }
}