import type {LazyExoticComponent} from 'react'

export type Route = {
  key: string
  path: string
  component: LazyExoticComponent<<T>(props: T) => JSX.Element> | React.FC<any>
  authority: string[]
}

export type Routes = Route[]
