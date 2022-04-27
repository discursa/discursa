import createNotification from "app/api/mutations/Notification/createNotification"
import deleteNotification from "app/api/mutations/Notification/deleteNotification"
import saveNotification from "app/api/mutations/Notification/saveNotification"
import { NotificationTemplateType } from "app/api/templates/types"
import { NotificationType } from "app/core/types"
import {
	addObjectToDb,
	removeObjectFromDb,
	updateDbObject,
} from "app/core/utils/functions"
import { BlitzRouter, Routes } from "blitz"
import { NotificationServiceType } from "./Notification.types"

export class NotificationService implements NotificationServiceType {
	async create(object: NotificationTemplateType, router: BlitzRouter) {
		try {
			await addObjectToDb(createNotification, object, router, "")
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async delete(notification: NotificationType, router: BlitzRouter) {
		const route = Routes.ShowInboxPage()
		const message = "This notification will be deleted"

		try {
			await removeObjectFromDb(
				deleteNotification,
				notification,
				router,
				route,
				message
			)
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
				saveNotification,
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
				saveNotification,
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
