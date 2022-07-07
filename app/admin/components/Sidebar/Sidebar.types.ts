import { RouteUrlObject } from "blitz"

interface SidebarProps {
	nestingLevel: string
}

interface SidebarLinkType {
	id: number
	name: string
	leadingicon: string
	route: RouteUrlObject
}

export type { SidebarProps, SidebarLinkType }
