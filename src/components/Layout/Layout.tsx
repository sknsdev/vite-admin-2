import React, { lazy, Suspense, useMemo } from "react"
import useAuth from "@/utils/hooks/useAuth"
import useLocale from "@/utils/hooks/useLocale"
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen"
import { LayoutTypes } from "@/@types/layout"
import { useRootStore } from "@/store/hook"

const layouts: any = {
  [LayoutTypes.SimpleSideBar]: lazy(() => import('./LayoutTypes/SimpleSideBar')),
  [LayoutTypes.DeckedSideBar]: lazy(() => import('./LayoutTypes/DeckedSideBar')),
  [LayoutTypes.CollapsedSideBar]: lazy(() => import('./LayoutTypes/CollapsedSideBar')),
}

export function Layout() {
  const { authenticated } = useAuth()
  const { themeStore } = useRootStore()
  const layoutType = LayoutTypes.SimpleSideBar

  useLocale()

  console.log(authenticated, layoutType)

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return layouts[layoutType]
    }
    return lazy(() => import('./AuthLayout'))
  }, [authenticated, layoutType])

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <LoadingScreen/>
        </div>
      }
    >
      
      <AppLayout/>
    </Suspense>
  )
}
