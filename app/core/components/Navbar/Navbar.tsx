import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { icons } from "app/core/utils/icons"
import { routes } from "app/core/utils/routes"
import { Link, Routes, useRouter, useSession } from "blitz"
import { FC, Fragment } from "react"
import { Avatar } from "../Avatar/Avatar"
import { Button } from "../Button/Button"
import { Icon } from "../Icon/Icon"
import { IconButton } from "../IconButton/IconButton"
import styles from "./Navbar.module.scss"
import { NavbarProps } from "./Navbar.types"

export const Navbar: FC<NavbarProps> = (props) => {
	const { activePage, nestingLevel } = props
	const { userRoutes } = routes
	const router = useRouter()
	const session = useSession()
	const user = useCurrentUser()
	const shortenUsername = user?.name?.slice(0, 1)

	const navbarItems = [
		{
			id: 0,
			name: "General",
			route: userRoutes.general,
		},
		{
			id: 1,
			name: "Discussions",
			route: userRoutes.discussions,
		},
		{
			id: 2,
			name: "Questions",
			route: userRoutes.questions,
		},
	]

	const navbarButtons = [
		{
			id: 0,
			href: icons.notification,
			route: userRoutes.inbox,
		},
	]

	return (
		<header className={styles.Navbar}>
			<div className="jcfs aic g2">
				<Link href="/">
					<a>
						<Icon size="logo" href={icons.logo} nestingLevel={nestingLevel} />
					</a>
				</Link>
				{navbarItems.map((item) => (
					<Link key={item.id} href={item.route}>
						<a className={`sub-text ${activePage === item.name && "active"}`}>
							{item.name}
						</a>
					</Link>
				))}
			</div>
			<div className="jcfe aic g2">
				{navbarButtons.map((button) => (
					<Link key={button.id} href={button.route}>
						<IconButton
							variant="tertiary"
							size="lg"
							href={button.href}
							nestinglevel={nestingLevel}
						/>
					</Link>
				))}
				{!session ? (
					<Fragment>
						<Button
							variant="primary"
							size="sm"
							onClick={() => router.push(Routes.LoginPage())}
						>
							Sign in
						</Button>
						<Button
							variant="secondary"
							size="sm"
							styles="bg-800"
							onClick={() => router.push(Routes.SignupPage())}
						>
							Sign up
						</Button>
					</Fragment>
				) : (
					// @ts-ignore
					<Link href={Routes.ShowUserProfilePage({ userId: user?.name })}>
						<a>
							<Avatar type="text" size="md" shortenName={shortenUsername} />
						</a>
					</Link>
				)}
			</div>
		</header>
	)
}
