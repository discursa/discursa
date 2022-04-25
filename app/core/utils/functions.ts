import { User } from "app/core/types"
import { BlitzRouter, RouteUrlObject } from "blitz"
import { DiscussionType } from "../types"

export const addObjectIntoStore = (setStore: Function, object: object) => {
	setStore((oldStore: Array<object>) => [...oldStore, object])
}

export const removeObjectFromStore = (
	store: Array<object>,
	setStore: Function
) => {
	if (store.length > 0) {
		const lastIndex = store.length - 1
		setStore(store.filter((item, index) => index !== lastIndex))
	} else {
		setStore(store.filter((item, index) => index !== 0))
	}
}

export const removeObjectFromDb = async (
	deleteMutation: Function,
	item: any,
	router: BlitzRouter,
	route: RouteUrlObject | "",
	message: string
) => {
	if (window.confirm(message)) {
		await deleteMutation({
			id_: item.id_,
		})
		route !== "" ? router.push(route) : location.reload()
	}
}

export const convertToSlug = (text: string) => {
	return text
		.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
}

export const trimWords = (text: string, count: number) => {
	return text.replace(/ /g, "").substr(0, count)
}

export const changeValue = (e: any, setStore: Function) => {
	return setStore(e.target.value)
}

export const resetValue = (setStore: Function) => {
	return setStore("")
}

export const shortenText = (objectField: string, symbolsCount: number) => {
	return objectField.length >= symbolsCount
		? trimWords(objectField, symbolsCount) + "..."
		: objectField
}

export const addObjectToDb = async (
	createMutation: Function,
	object: any,
	router: any,
	route: RouteUrlObject | ""
) => {
	await createMutation(object)
	if (route !== "") {
		router.push(route)
	} else {
		location.reload()
	}
}

export const updateDbObject = async (
	updateItemMutation: Function,
	id_: number,
	values: any,
	setQueryData: Function
) => {
	const updated = await updateItemMutation({
		id_: id_,
		...values,
	})
	await setQueryData(updated)
}

export const upvoteDiscussionFunc = async (
	upvoteDiscussionMutation: Function,
	discussion: DiscussionType,
	userId: string,
	setQueryData: Function
) => {
	const upvotes = discussion.upvotes + 1
	const updated = await upvoteDiscussionMutation(
		discussion.id_,
		upvotes,
		userId
	)
	await setQueryData(updated)
}

export const getId = (items: Array<object>) => {
	return items.length === 0 ? 0 : items.length + 1
}

export const getShortenUsername = (user: User) => {
	const firstName = user.firstName.slice(0, 1)
	const lastName = user.lastName.slice(0, 1)

	return `${firstName}${lastName}`
}

export const getItemDescription = (description?: string, item?: any) => {
	const capitalizedItem = item[0].toUpperCase() + item.slice(1)

	return description === ""
		? `${capitalizedItem} hasn't description`
		: description
}

export const getSearchItems = (items: any[], query: string) => {
	return items.filter((item) => {
		if (query === "") {
			return item
		} else if (item.name.toLowerCase().includes(query.toLowerCase())) {
			return item
		}
	})
}

export const removeElementFromArray = (array: any[], value: any) => {
	return array.filter((element) => element !== value)
}
