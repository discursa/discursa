import { RouteUrlObject } from "blitz"

export interface BreadcrumbsProps {
  items: BreadcrumbsItem[]
  separator?: ">" | "/"
}

interface BreadcrumbsItem {
  id: number
  name: string
  route: RouteUrlObject
}
