import {
	addObjectToDb,
	deleteObjectFromDb,
	updateDbObject,
} from "app/core/utils/functions"
import { BlitzRouter, Routes } from "blitz"
import changeNotificationType from "../mutations/changeNotificationType"
import createNotification from "../mutations/createNotification"
import deleteNotification from "../mutations/deleteNotification"
import { NotificationServiceType, NotificationType } from "../types"

export class NotificationService implements NotificationServiceType {
	async create(object: any, router: BlitzRouter) {
		try {
			await addObjectToDb(createNotification, object, router, "")
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async delete(notification: NotificationType, router: BlitzRouter) {
		const route = Routes.ShowInboxPage()

		try {
			await deleteObjectFromDb(deleteNotification, notification, router, route)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async save(notification: NotificationType, setQueryData: Function) {
		const savedNotification = {
			type: "saved",
		}
		try {
			await updateDbObject(
				changeNotificationType,
				notification.id_,
				savedNotification,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async read(notification: NotificationType, setQueryData: Function) {
		const readNotification = {
			type: "read",
		}
		try {
			await updateDbObject(
				changeNotificationType,
				notification.id_,
				readNotification,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
