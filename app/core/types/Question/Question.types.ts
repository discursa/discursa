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
	createdAt: Date
	updatedAt: Date
}

interface QuestionFromValuesType {
	name: string
	description: string
	visibility: string
}

export type { QuestionType, QuestionFromValuesType }
