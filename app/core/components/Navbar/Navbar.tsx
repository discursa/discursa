import { icons } from "app/core/utils/icons"
import { routes } from "app/core/utils/routes"
import { Link, Routes, useRouter, useSession } from "blitz"
import { FC, Fragment } from "react"
import { Button } from "../Button/Button"
import { IconButton } from "../IconButton/IconButton"
import styles from "./Navbar.module.scss"
import { NavbarProps } from "./Navbar.types"

export const Navbar: FC<NavbarProps> = (props) => {
  const { activePage, nestingLevel } = props
  const { userRoutes } = routes
  const router = useRouter()
  const session = useSession()

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
        {!session && (
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
        )}
      </div>
    </header>
  )
}
