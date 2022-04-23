import { ReactNode } from "react"

export interface LayoutProps {
  activePage: string
  children: ReactNode
  nestingLevel: string
  pageTitle: string
  pageClass: any
}
