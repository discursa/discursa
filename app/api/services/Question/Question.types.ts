import { DefaultServiceType } from "../types"

export interface QuestionServiceType extends DefaultServiceType {
	answer: Function
	comment: Function
	join: Function
	leave: Function
	changeAuthor: Function
}
