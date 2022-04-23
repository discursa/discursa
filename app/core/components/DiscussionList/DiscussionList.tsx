import { getSearchItems } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { Routes, useRouter } from "blitz"
import { FC } from "react"
import { Button } from "../Button/Button"
import DiscussionCard from "../DiscussionCard/DiscussionCard"
import InfoBlock from "../InfoBlock/InfoBlock"
import styles from "./DiscussionList.module.scss"
import {
  DiscussionListProps,
  ListProps,
  SubListProps,
} from "./DiscussionList.types"

export const DiscussionList: FC<DiscussionListProps> = (props) => {
  const { discussions, search, query, top, nestingLevel } = props

  return top ? (
    <TopDiscussionsList
      discussions={discussions}
      search={search}
      query={query}
      nestingLevel={nestingLevel}
    />
  ) : (
    <AllDiscussionsList
      discussions={discussions}
      search={search}
      query={query}
      nestingLevel={nestingLevel}
    />
  )
}

const AllDiscussionsList: FC<SubListProps> = (props) => {
  const { discussions, search, query, nestingLevel } = props

  const foundDiscussions = getSearchItems(discussions, query)

  return search ? (
    <SearchList discussions={foundDiscussions} nestingLevel={nestingLevel} />
  ) : (
    <List discussions={discussions} nestingLevel={nestingLevel} />
  )
}

const TopDiscussionsList: FC<SubListProps> = (props) => {
  const { discussions, search, query, nestingLevel } = props

  const topDiscussions = discussions.sort((a, b) => {
    return b.upvotes - a.upvotes
  })

  const foundDiscussions = getSearchItems(topDiscussions, query)

  return search ? (
    <SearchList
      discussions={foundDiscussions}
      resetInputValue={() => resetInputValue()}
      nestingLevel={nestingLevel}
    />
  ) : (
    <List discussions={topDiscussions} nestingLevel={nestingLevel} />
  )
}

const SearchList: FC<ListProps> = (props) => {
  const { discussions, nestingLevel } = props
  const router = useRouter()

  const redirectToCreateDiscussionPage = () => {
    router.push(Routes.ShowCreateDiscussionPage())
  }

  return discussions.length === 0 ? (
    <InfoBlock
      title="Discussions not found"
      description="Discussions that you're searching for not found"
      href={icons.info}
      nestingLevel={nestingLevel}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={() => redirectToCreateDiscussionPage()}
      >
        Create Discussion
      </Button>
    </InfoBlock>
  ) : (
    <ul className={styles.DiscussionList}>
      {discussions.map((discussion) => (
        <DiscussionCard
          key={discussion.id_}
          discussion={discussion}
          nestingLevel={nestingLevel}
        />
      ))}
    </ul>
  )
}

const List: FC<ListProps> = (props) => {
  const { discussions, nestingLevel } = props
  const router = useRouter()

  const redirectToCreateDiscussionPage = () => {
    router.push(Routes.ShowCreateDiscussionPage())
  }

  return discussions.length === 0 ? (
    <InfoBlock
      title="Discussions not found"
      description="No one discussion was found, your may be first"
      href={icons.info}
      nestingLevel={nestingLevel}
    >
      <Button
        variant="primary"
        size="md"
        onClick={() => redirectToCreateDiscussionPage()}
      >
        Create discussion
      </Button>
    </InfoBlock>
  ) : (
    <ul className={styles.DiscussionList}>
      {discussions.map((discussion) => (
        <DiscussionCard
          key={discussion.id_}
          discussion={discussion}
          nestingLevel={nestingLevel}
        />
      ))}
    </ul>
  )
}
