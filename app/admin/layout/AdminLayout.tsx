import { Header } from "app/core/components"
import { Head } from "blitz"
import { FC, Fragment } from "react"
import { Sidebar } from "../components/Sidebar/Sidebar"

interface AdminLayoutProps {
	nestingLevel: ""
	pageTitle: string
}

export const AdminLayout: FC<AdminLayoutProps> = (props) => {
	const { nestingLevel, pageTitle } = props

	return (
		<Fragment>
			<Head>
				<title>{pageTitle}</title>
				<body className="row" />
			</Head>
			<Sidebar nestingLevel={nestingLevel} />
			<main></main>
		</Fragment>
	)
}
