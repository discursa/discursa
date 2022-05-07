import getUser from "app/api/queries/User/getUser"
import { Header, LoadingOverlay, Spinner } from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { useParam, useQuery } from "blitz"
import { Fragment, Suspense } from "react"

const NESTING_LEVEL = ""

const UserProfilePage = () => {
	const userId = useParam("userId", "string")
	const [user] = useQuery(getUser, {
		name: userId,
	})

	return (
		<Layout
			activePage=""
			pageTitle={user.name}
			pageClass={styles.LayputBase}
			nestingLevel={NESTING_LEVEL}
		>
			<div />
			<div>
				<p className="simple-text">{user.name}</p>
			</div>
		</Layout>
	)
}

const ShowUserProfilePage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<UserProfilePage />
			</Suspense>
		</Fragment>
	)
}

export default ShowUserProfilePage
