import { CategoryService } from "app/api/services"
import { icons } from "app/core/utils/icons"
import { useRouter } from "blitz"
import { FC, Fragment } from "react"
import CategoryCard from "../CategoryCard/CategoryCard"
import { InfoBlock } from "../InfoBlock/InfoBlock"
import styles from "./CategoryList.module.scss"
import { CategoryListProps } from "./CategoryList.types"

const categoryService = new CategoryService()

export const CategoryList: FC<CategoryListProps> = (props) => {
	const { categories, nestingLevel, modals, setModals } = props
	const router = useRouter()

	return categories.length === 0 ? (
		<InfoBlock
			title="Categories not found"
			description="No one category has found"
			href={icons.info}
			nestingLevel={nestingLevel}
		/>
	) : (
		<Fragment>
			<div className={styles.CategoryListHeader}>
				<p className="simple-text">{categories.length} categories</p>
			</div>
			<ul className={styles.CategoryList}>
				{categories.map((category) => (
					<CategoryCard
						key={category.id_}
						category={category}
						modals={modals}
						setModals={setModals}
						deleteCategory={async () =>
							await categoryService.delete(category, router)
						}
						nestingLevel={nestingLevel}
					/>
				))}
			</ul>
		</Fragment>
	)
}
