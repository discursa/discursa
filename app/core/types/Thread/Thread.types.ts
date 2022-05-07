export interface ThreadType {
	id: string
	id_: number
	name: string
	visibility: string
	members?: string[]
	parent: number
	createdAt: Date
	updatedAt: Date
}
