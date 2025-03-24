import SignIn from '@/pages/auth/SignIn'
import type {Routes} from '@/@types/routes'

const authRoute: Routes = [
  {
    key: 'signIn',
    path: `/sign-in`,
    component: SignIn,
    authority: []
  },
  // {
  //   key: 'signUp',
  //   path: `/sign-up`,
  //   component: lazy(() => import('@/views/auth/SignUp')),
  //   authority: []
  // },
]

export default authRoute
