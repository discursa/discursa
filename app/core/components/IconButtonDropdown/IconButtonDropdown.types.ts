export interface IconButtonDropdownProps {
  variant: "secondary" | "tertiary"
  size: "sm" | "md" | "lg"
  href: string
  items: any[]
  nestingLevel: string
}

export interface IconButtonDropdownItem {
  id: number
  name: string
  variant: "secondary" | "danger"
  size: "sm" | "md"
  onClick: Function
}
