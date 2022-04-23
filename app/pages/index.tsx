import { Spinner } from "app/core/components"
import { Header } from "app/core/components/Header/Header"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { pages } from "app/core/utils/pages"
import { BlitzPage } from "blitz"
import { Fragment, Suspense } from "react"

const NESTING_LEVEL: string = ""

const Home = () => {
  return (
    <Layout
      activePage={pages.general}
      pageTitle={pages.general}
      pageClass={styles.LayoutBase}
      nestingLevel={NESTING_LEVEL}
    >
      <h2>{pages.general}</h2>
    </Layout>
  )
}

const ShowHome: BlitzPage = () => {
  return (
    <Fragment>
      <Header title="Loading" />
      <Suspense fallback={<Spinner />}>
        <Home />
      </Suspense>
    </Fragment>
  )
}

Home.suppressFirstRenderFlicker = true

export default ShowHome
