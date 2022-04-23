import { ReactNode } from "react"

export interface InfoBlockProps {
  title: string
  description: string
  href: string
  children?: ReactNode
  nestingLevel: string
}
