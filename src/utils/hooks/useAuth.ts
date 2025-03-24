import { useRootStore } from '@/store/hook'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import { SignInCredential, SignUpCredential } from '@/@types/auth'
import { AuthService } from "@/services/auth/auth.service"
import useQuery from './useQuery'

type Status = 'success' | 'failed'

function useAuth() {
  const { authStore } = useRootStore()
  const navigate = useNavigate()
  const query = useQuery()

  const signIn = async (
    values: SignInCredential
  ): Promise<
    | {
      status: Status
      message: string
    }
    | undefined
  > => {
    try {
      console.log('Sign in')
      const resp = await AuthService.signIn(values.email, values.password)
      console.log('resp:')
      const {
        access_token,
        id,
        email,
        fullName,
        phoneNumber
      } = resp
      authStore.userInfo.setUserId(id)
      authStore.session.signInSuccess({
        token: access_token,
        refreshToken: '',
        expireTime: 0
      })
      authStore.user.setUser({
        fullName,
        email,
        role: resp.authority,
        phoneNumber
      })

      const redirectUrl = query.get(REDIRECT_URL_KEY)
      navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
      return {
        status: 'success',
        message: ''
      }
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.description || errors.toString()
      }
    }
  }

  const signUp = async (values: SignUpCredential) => {
    // try {
    //   await AuthService.signUp(values)
    //   return {
    //     status: 'success',
    //     message: ''
    //   }
    // } catch (errors: any) {
    //   return {
    //     status: 'failed',
    //     message: errors?.response?.data?.description || errors.toString()
    //   }
    // }
  }

  const handleSignOut = () => {
    authStore.session.signOutSuccess()
    authStore.userInfo.setUserInfo({
      googleLogin: false,
      name: '',
      role: '',
      email: '',
      userId: authStore.userInfo.userId
    })
    authStore.user.setUser({
      fullName: '',
      role: [],
      email: ''
    })
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  const signOut = async () => {
    // await apiSignOut()
    handleSignOut()
  }

  return {
    authenticated: authStore.session.token && authStore.session.signedIn,
    signIn,
    signUp,
    signOut,
  }
}

export default useAuth
