import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

export class SessionStore {
  signedIn: boolean = false
  token: string | null = null
  expireTime: number = 0
  refreshToken: string | null = null

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'SessionStore',
      properties: ['signedIn', 'token', 'expireTime', 'refreshToken'],
      storage: window.localStorage,
    })
  }

  signInSuccess(payload: { token: string, expireTime: number, refreshToken: string }) {
    this.signedIn = true
    this.token = payload.token
    this.expireTime = payload.expireTime
    this.refreshToken = payload.refreshToken
  }

  signOutSuccess() {
    this.signedIn = false
    this.token = null
    this.refreshToken = null
    this.expireTime = -1
  }

  updateSession(payload: { token: string, expireTime: number, refreshToken: string }) {
    this.token = payload.token
    this.expireTime = payload.expireTime
    this.refreshToken = payload.refreshToken
  }
}

export class UserStore {
  fullName?: string = ''
  phoneNumber?: string = ''
  email?: string = ''
  role?: string[] = []

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'UserStore',
      properties: ['fullName', 'phoneNumber', 'email', 'role'],
      storage: window.localStorage,
    })
  }

  setUser(payload: { email?: string, fullName?: string, role?: string[], phoneNumber?: string }) {
    this.email = payload?.email
    this.fullName = payload?.fullName
    this.role = payload?.role
    this.phoneNumber = payload?.phoneNumber
  }

  setUserRole(role: string[]) {
    this.role = role
  }

  setUserName(name: string) {
    this.fullName = name
  }
}

export class UserInfoStore {
  email: string = ''
  userId: string = ''
  isTwoFaEnabled?: boolean = false
  name?: string = ''
  walletAddress?: string = ''
  language?: string = ''
  role: string = ''
  googleLogin?: boolean = false
  notificationCount?: number = 0

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'UserInfoStore',
      properties: [
        'email', 'userId', 'isTwoFaEnabled', 'name', 'walletAddress',
        'language', 'role', 'googleLogin', 'notificationCount'
      ],
      storage: window.localStorage,
    })
  }

  setUserInfo(payload: {
    userId: string,
    email: string,
    language?: string,
    role: string,
    walletAddress?: string,
    name?: string,
    googleLogin?: boolean,
    notificationCount?: number,
    isTwoFaEnabled?: boolean
  }) {
    this.userId = payload?.userId
    this.email = payload?.email
    this.language = payload?.language
    this.role = payload?.role
    this.walletAddress = payload?.walletAddress
    this.name = payload?.name
    this.googleLogin = payload?.googleLogin
    this.notificationCount = payload?.notificationCount
    this.isTwoFaEnabled = payload?.isTwoFaEnabled
  }

  setLanguage(language: string) {
    this.language = language
  }

  setUserInfoRole(role: string) {
    this.role = role
  }

  setDisplayName(name: string) {
    this.name = name
  }

  setWalletAddress(address: string) {
    this.walletAddress = address
  }

  setUserId(id: string) {
    this.userId = id
  }

  setNotificationCount(count: number) {
    this.notificationCount = count
  }

  setTwoFactorAuth(enabled: boolean) {
    this.isTwoFaEnabled = enabled
  }
}

export class AuthStore {
  session = new SessionStore()
  user = new UserStore()
  userInfo = new UserInfoStore()

  constructor() {
    makeAutoObservable(this)
  }

  signOut() {
    this.session.signOutSuccess()
    this.user.setUser({})
    this.userInfo.setUserInfo({
      userId: '',
      email: '',
      role: ''
    })
  }
}