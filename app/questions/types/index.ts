interface QuestionType {
	id: string
	id_: number
	name: string
	description: string
	visibility: string
	answered: boolean
	authorId: string
	answerId: string
	parent: number
	members: string[]
	banned: string[]
	createdAt: Date
	updatedAt: Date
}

interface QuestionFromValuesType {
	name: string
	description: string
	visibility: string
}

interface QuestionServiceType {
	create: Function
	update: Function
	delete: Function
	answer: Function
	comment: Function
	join: Function
	leave: Function
	changeAuthor: Function
}

export type { QuestionType, QuestionFromValuesType, QuestionServiceType }
