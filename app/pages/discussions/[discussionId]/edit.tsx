import {
	Alert,
	Breadcrumbs,
	Header,
	LoadingOverlay,
	ModalWindow,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import {
	getNothingChangedAlert,
	getSuccessfullyUpdatedAlert,
} from "app/core/templates/alert"
import { AlertType, ModalWindowType } from "app/core/types"
import {
	addObjectToStore,
	getId,
	removeObjectFromStore,
} from "app/core/utils/functions"
import {
	DeleteDiscussionModal,
	DiscussionForm,
	DiscussionSchema,
	DiscussionService,
} from "app/discussions"
import getDiscussion from "app/discussions/queries/getDiscussion"
import { BlitzPage, Routes, useParam, useQuery } from "blitz"
import { Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../../"

export const EditDiscussion = () => {
	const discussionService = new DiscussionService()
	const discussionId = useParam("discussionId", "number")
	const [alerts, setAlerts] = useState<AlertType[]>([])
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [discussion, { setQueryData }] = useQuery(
		getDiscussion,
		{
			id_: discussionId,
		},
		{
			staleTime: Infinity,
		}
	)

	const breadcrumbsItems = [
		{
			id: 0,
			name: "General",
			route: Routes.ShowHome(),
		},
		{
			id: 1,
			name: "Discussions",
			route: Routes.ShowDiscussionsPage(),
		},
		{
			id: 2,
			name: discussion.name,
			route: Routes.ShowDiscussionPage({ discussionId: discussion.id_ }),
		},
		{
			id: 2,
			name: "Edit discussion",
			route: Routes.EditDiscussionPage({ discussionId: discussion.id_ }),
		},
	]

	const nothingChangedAlert = getNothingChangedAlert(alerts, "discussion")
	const successfullyUpdatedAlert = getSuccessfullyUpdatedAlert(
		alerts,
		"discussion"
	)

	const deleteDiscussionModal = {
		id: getId(modals),
		title: "Are you absolutely sure?",
		children: <DeleteDiscussionModal discussion={discussion} />,
	}

	return (
		<Layout
			activePage="Discussions"
			pageTitle={discussion.name}
			pageClass={styles.LayoutForm}
			nestingLevel={NESTING_LEVEL}
		>
			<Breadcrumbs items={breadcrumbsItems} />
			<DiscussionForm
				className="w75 col g1"
				submitText="Update"
				resetText="Delete"
				initialValues={discussion}
				schema={DiscussionSchema}
				onSubmit={async (values) =>
					discussionService.update(
						values,
						discussion,
						setQueryData,
						// @ts-ignore
						addObjectToStore(setAlerts, nothingChangedAlert),
						// @ts-ignore
						addObjectToStore(setAlerts, successfullyUpdatedAlert)
					)
				}
				onReset={() => addObjectToStore(setModals, deleteDiscussionModal)}
			/>
			{alerts.map((alert) => (
				<Alert
					key={alert.id}
					variant={alert.variant}
					message={alert.message}
					toast={false}
					iconHref={alert.iconHref}
					nestingLevel={NESTING_LEVEL}
					styles="bottom-20"
					remove={() => removeObjectFromStore(alerts, setAlerts)}
				/>
			))}
			{modals.map((modal) => (
				<ModalWindow
					key={modal.id}
					title={modal.title}
					modals={modals}
					setModals={setModals}
					nestingLevel={NESTING_LEVEL}
				>
					{modal.children}
				</ModalWindow>
			))}
		</Layout>
	)
}

const EditDiscussionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<EditDiscussion />
			</Suspense>
		</Fragment>
	)
}

EditDiscussionPage.authenticate = false

export default EditDiscussionPage
