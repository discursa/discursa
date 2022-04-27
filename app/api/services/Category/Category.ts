import createCategory from "app/api/mutations/Category/createCategory"
import deleteCategory from "app/api/mutations/Category/deleteCategory"
import updateCategory from "app/api/mutations/Category/updateCategory"
import { check } from "app/core/modules/Check"
import { CategoryType } from "app/core/types"
import {
	addObjectToDb,
	deleteObjectFromDb,
	getId,
	updateDbObject,
} from "app/core/utils/functions"
import { BlitzRouter } from "blitz"
import { DefaultServiceType } from "../types"

interface ValuesType {
	name: string
	description: string
}

export class CategoryService implements DefaultServiceType {
	async create(
		values: ValuesType,
		categories: CategoryType[],
		router: BlitzRouter
	) {
		const description = values.description === "" ? "" : values.description

		const category = {
			id_: getId(categories),
			name: values.name,
			description: description,
		}

		try {
			await addObjectToDb(createCategory, category, router, "")
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async update(
		values: ValuesType,
		category: CategoryType,
		setQueryData: Function,
		pushNothingChangedAlert: any,
		pushSuccessfullyUpdatedAlert: any
	) {
		const arrayForCheck = [
			{
				name: values.name,
				initialName: category.name,
			},
			{
				name: values.description,
				initialName: category.description,
			},
		]

		try {
			if (!check.changes(arrayForCheck)) {
				await updateDbObject(updateCategory, category.id_, values, setQueryData)
				pushSuccessfullyUpdatedAlert()
			} else {
				pushNothingChangedAlert()
			}
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async delete(category: CategoryType, router: BlitzRouter) {
		const message = "This category will be deleted"

		try {
			await deleteObjectFromDb(deleteCategory, category, router, "", message)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
