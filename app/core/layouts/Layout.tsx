import React, { FC, Fragment } from "react"
import { LayoutProps } from "app/core/layouts/Layout.types"
import { Navbar } from "../components/Navbar/Navbar"
import { animated, useSpring } from "@react-spring/web"
import { transitionIn } from "app/core/utils/animations"
import { Header } from "app/core/components"

const Layout: FC<LayoutProps> = (props) => {
  const { activePage, children, nestingLevel, pageTitle, pageClass } = props

  const prop = useSpring(transitionIn)

  return (
    <Fragment>
      <Header title={pageTitle} />
      <Navbar activePage={activePage} nestingLevel={nestingLevel} />
      <animated.main className={pageClass} style={prop} role="main">
        {children}
      </animated.main>
    </Fragment>
  )
}

export default React.memo(Layout)
