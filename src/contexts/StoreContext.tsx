import { createContext, useContext } from 'react'
import { RootStore } from '../store/mobx/RootStore'

export const StoreContext = createContext<RootStore>({} as RootStore)

export const useStore = () => useContext(StoreContext)

export const StoreProvider = StoreContext.Provider