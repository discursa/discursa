import { Fragment, Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  Routes,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import { Breadcrumbs, Header, Spinner } from "app/core/components"
import styles from "app/core/layouts/Layout.module.scss"

const NESTING_LEVEL = "../"

export const DiscussionPage = () => {
  const router = useRouter()
  const discussionId = useParam("discussionId", "number")
  const [discussion] = useQuery(getDiscussion, { id_: discussionId })
  const breadcrumbsItems = [
    {
      id: 0,
      name: "General",
      route: Routes.ShowHome(),
    },
    {
      id: 2,
      name: "Discussions",
      route: Routes.ShowDiscussionsPage(),
    },
    {
      id: 0,
      name: discussion.name,
      route: Routes.ShowDiscussionPage({ discussionId: discussion.id_ }),
    },
  ]

  return (
    <Layout
      activePage=""
      pageTitle={discussion.name}
      pageClass={styles.LayoutBase}
      nestingLevel={NESTING_LEVEL}
    >
      <div></div>
      <Breadcrumbs items={breadcrumbsItems} />
    </Layout>
  )
}

const ShowDiscussionPage: BlitzPage = () => {
  return (
    <Fragment>
      <Header title="Loading..." />
      <Suspense fallback={<Spinner />}>
        <DiscussionPage />
      </Suspense>
    </Fragment>
  )
}

ShowDiscussionPage.authenticate = false

export default ShowDiscussionPage
