import { getId } from "app/core/utils/functions"
import { AlertType } from "../types"
import { icons } from "../utils/icons"

export const getNothingChangedAlert = (
	alerts: AlertType[],
	item: "discussion" | "thread" | "question"
) => {
	return {
		id: getId(alerts),
		variant: "warning",
		message: `You can't update ${item}, because nothing changed`,
		iconHref: icons.warning,
	}
}

export const getSuccessfullyUpdatedAlert = (
	alerts: AlertType[],
	item: "discussion" | "thread" | "question"
) => {
	return {
		id: getId(alerts),
		variant: "success",
		message: `${item} updated successfully`,
		iconHref: icons.success,
	}
}
