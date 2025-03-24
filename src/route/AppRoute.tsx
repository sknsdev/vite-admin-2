import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import type { ComponentType } from 'react'
import { useRootStore } from '@/store/hook'

export type AppRouteProps<T> = {
  component: ComponentType<T>
  routeKey: string
}

const AppRoute = <T extends Record<string, unknown>>({
  component: Component,
  routeKey,
  ...props
}: AppRouteProps<T>) => {
  const location = useLocation()
  const { baseStore } = useRootStore()

  const handleLayoutChange = useCallback(() => {
    baseStore.setCurrentRouteKey(routeKey)
  }, [baseStore, routeKey])

  useEffect(() => {
    handleLayoutChange()
  }, [location, handleLayoutChange])

  return <Component {...(props as T)} />
}

export default AppRoute
