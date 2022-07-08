import { check } from "app/core/modules/Check"
import {
	addObjectToDb,
	deleteObjectFromDb,
	getId,
	updateDbObject,
} from "app/core/utils/functions"
import { BlitzRouter } from "blitz"
import createCategory from "../mutations/createCategory"
import deleteCategory from "../mutations/deleteCategory"
import updateCategory from "../mutations/updateCategory"
import {
	CategoryFormValuesType,
	CategoryServiceType,
	CategoryType,
} from "../types"

export class CategoryService implements CategoryServiceType {
	async create(
		values: CategoryFormValuesType,
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
		values: CategoryFormValuesType,
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
			await deleteObjectFromDb(deleteCategory, category, router, null)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
