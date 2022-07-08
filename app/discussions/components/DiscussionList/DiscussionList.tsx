import { Button, InfoBlock, Pagination } from "app/core/components"
import { ITEMS_PER_PAGE } from "app/core/constants"
import { getSearchItems } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { Routes, useRouter } from "blitz"
import { FC } from "react"
import { DiscussionCard } from "../DiscussionCard/DiscussionCard"
import styles from "./DiscussionList.module.scss"
import {
	DiscussionListProps,
	ListProps,
	SubListProps,
} from "./DiscussionList.types"

export const DiscussionList: FC<DiscussionListProps> = (props) => {
	const {
		discussions,
		search,
		query,
		top,
		nestingLevel,
		isPreviousData,
		hasMore,
		page,
	} = props

	return top ? (
		<TopDiscussionsList
			discussions={discussions}
			search={search}
			query={query}
			nestingLevel={nestingLevel}
			isPreviousData={isPreviousData}
			hasMore={hasMore}
			page={page}
		/>
	) : (
		<AllDiscussionsList
			discussions={discussions}
			search={search}
			query={query}
			nestingLevel={nestingLevel}
			isPreviousData={isPreviousData}
			hasMore={hasMore}
			page={page}
		/>
	)
}

const AllDiscussionsList: FC<SubListProps> = (props) => {
	const {
		discussions,
		search,
		query,
		nestingLevel,
		isPreviousData,
		hasMore,
		page,
	} = props

	const foundDiscussions = getSearchItems(discussions, query)

	return search ? (
		<SearchList
			discussions={foundDiscussions}
			nestingLevel={nestingLevel}
			isPreviousData={isPreviousData}
			hasMore={hasMore}
			page={page}
		/>
	) : (
		<List
			discussions={discussions}
			nestingLevel={nestingLevel}
			isPreviousData={isPreviousData}
			hasMore={hasMore}
			page={page}
		/>
	)
}

const TopDiscussionsList: FC<SubListProps> = (props) => {
	const {
		discussions,
		search,
		query,
		nestingLevel,
		isPreviousData,
		hasMore,
		page,
	} = props

	const topDiscussions = discussions.sort((a, b) => {
		return b.upvotes - a.upvotes
	})

	const foundDiscussions = getSearchItems(topDiscussions, query)

	return search ? (
		<SearchList
			discussions={foundDiscussions}
			nestingLevel={nestingLevel}
			isPreviousData={isPreviousData}
			hasMore={hasMore}
			page={page}
		/>
	) : (
		<List
			discussions={topDiscussions}
			nestingLevel={nestingLevel}
			isPreviousData={isPreviousData}
			hasMore={hasMore}
			page={page}
		/>
	)
}

const SearchList: FC<ListProps> = (props) => {
	const { discussions, nestingLevel, isPreviousData, hasMore, page } = props
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
				New discussion
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
			{discussions.length > ITEMS_PER_PAGE && (
				<Pagination
					isPreviousData={isPreviousData}
					hasMore={hasMore}
					page={page}
				/>
			)}
		</ul>
	)
}
const List: FC<ListProps> = (props) => {
	const { discussions, nestingLevel, isPreviousData, hasMore, page } = props
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
				size="lg"
				onClick={() => redirectToCreateDiscussionPage()}
			>
				New discussion
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
			{discussions.length > ITEMS_PER_PAGE && (
				<Pagination
					isPreviousData={isPreviousData}
					hasMore={hasMore}
					page={page}
				/>
			)}
		</ul>
	)
}
