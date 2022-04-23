import getDiscussions from "app/api/queries/Discussion/getDiscussions"
import {
  Button,
  ButtonGroup,
  DiscussionList,
  Header,
  Spinner,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { changeValue, resetValue } from "app/core/utils/functions"
import { pages } from "app/core/utils/pages"
import { BlitzPage, Routes, useQuery, useRouter, useSession } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL: string = ""

const DiscussionsPage: FC = () => {
  const session = useSession()
  const router = useRouter()
  const [query, setQuery] = useState<string>("")
  const [top, setTop] = useState<boolean>(false)
  const [discussions] = useQuery(getDiscussions, {})
  const groupedButtons = [
    {
      id: 0,
      name: "All",
      onClick() {
        setTop(false)
      },
    },
    {
      id: 1,
      name: "Top",
      onClick() {
        setTop(true)
      },
    },
  ]

  const createDiscussion = () => {
    if (session) {
      router.push(Routes.ShowCreateDiscussionPage())
    }
  }

  return (
    <Layout
      activePage={pages.discussions}
      pageTitle={pages.discussions}
      pageClass={styles.LayoutBase}
      nestingLevel={NESTING_LEVEL}
    >
      <div />
      <div>
        <div className="w100 row aic jcc g1 bottom-space-md">
          <ButtonGroup
            variant="secondary"
            size="md"
            buttons={groupedButtons}
            dropdown={false}
          />
          <input
            className="input-md w50"
            type="text"
            placeholder="Find discussion"
            value={query}
            onChange={(e: any) => changeValue(e, setQuery)}
          />
          <Button
            variant="primary"
            size="md"
            disabled={!session}
            onClick={createDiscussion}
          >
            Create
          </Button>
        </div>
        <DiscussionList
          discussions={discussions}
          top={top}
          search={discussions.length !== 0}
          query={query}
          nestingLevel={NESTING_LEVEL}
        />
      </div>
      <div />
    </Layout>
  )
}

const ShowDiscussionsPage: BlitzPage = () => {
  return (
    <Fragment>
      <Header title="Loading" />
      <Suspense
        fallback={
          <div className="w100 h100 aic jcc col">
            <Spinner />
          </div>
        }
      >
        <DiscussionsPage />
      </Suspense>
    </Fragment>
  )
}

ShowDiscussionsPage.authenticate = false

export default ShowDiscussionsPage
