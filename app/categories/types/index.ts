interface CategoryType {
	id: string
	id_: number
	name: string
	description: string
	createdAt: Date
	updatedAt: Date
}

interface CategoryFormValuesType {
	name: string
	description: string
}

interface CategoryServiceType {
	create: Function
	update: Function
	delete: Function
}

export type { CategoryFormValuesType, CategoryServiceType, CategoryType }
