import { useStore } from '../contexts/StoreContext'
import { RootStore } from './mobx/RootStore'

export const useRootStore = (): RootStore => useStore()
