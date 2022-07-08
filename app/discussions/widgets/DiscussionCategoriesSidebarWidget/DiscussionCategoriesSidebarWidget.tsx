import getCategories from "app/categories/queries/getCategories"
import { Button, IconButton } from "app/core/components"
import { check } from "app/core/modules/Check"
import { DiscussionType } from "app/core/types"
import { icons } from "app/core/utils/icons"
import { Link, Routes, useQuery, useSession } from "blitz"
import { FC, useState } from "react"

interface DiscussionCategoriesSidebarWidgetProps {
	discussions: DiscussionType[]
	allDiscussions: DiscussionType[]
	setCurrentDiscussions: Function
	nestingLevel: string
}

export const DiscussionCategoriesSidebarWidget: FC<
	DiscussionCategoriesSidebarWidgetProps
> = (props) => {
	const { discussions, allDiscussions, setCurrentDiscussions, nestingLevel } =
		props

	const session = useSession()

	const [activeCategory, setActiveCategory] = useState<number | null>(null)
	const [categories] = useQuery(getCategories, {})

	const resetCategories = () => {
		setActiveCategory(null)
		setCurrentDiscussions(allDiscussions)
	}

	const changeCategory = (name: string, id: number) => {
		const categoryDiscussions = discussions.filter((discussion) => {
			return discussion.category === name
		})
		setActiveCategory(id)
		setCurrentDiscussions(categoryDiscussions)
	}

	return (
		<aside className="col aifs jcfs g2">
			<div className="w100 row aic jcsb">
				<p className="simple-text">Categories</p>
				{check.admin(session) && (
					<Link href={Routes.ShowDiscussionCategoriesPage()}>
						<IconButton
							variant="tertiary"
							size="md"
							href={icons.gear}
							nestinglevel={nestingLevel}
						/>
					</Link>
				)}
			</div>
			<div className="w100 col g1">
				<Button
					variant={activeCategory === null ? "primary" : "tertiary"}
					size="lg"
					styles="w100 jcfs"
					onClick={() => resetCategories()}
				>
					View all
				</Button>
				{categories.map((category) => (
					<Button
						key={category.id_}
						variant={activeCategory === category.id_ ? "primary" : "tertiary"}
						size="lg"
						styles="w100 jcfs"
						onClick={() => changeCategory(category.name, category.id_)}
					>
						{category.name}
					</Button>
				))}
			</div>
		</aside>
	)
}
