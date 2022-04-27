import deleteCategory from "app/api/mutations/Category/deleteCategory"
import UpdateCategory from "app/api/mutations/Category/updateCategory"
import { addObjectToStore, getId } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import React, { FC } from "react"
import { IconButton } from "../IconButton/IconButton"
import { UpdateCategoryModal } from "../ModalWindow/children/UpdateCategoryModal"
import styles from "./CategoryCard.module.scss"
import { CategoryCardProps } from "./CategoryCard.types"

const CategoryCard: FC<CategoryCardProps> = (props) => {
	const { category, nestingLevel, modals, setModals, deleteCategory } = props

	const updateCategoryModal = {
		id: getId(modals),
		title: "Edit category",
		children: <UpdateCategoryModal id_={category.id_} />,
	}

	return (
		<li className={styles.CategoryCard}>
			<div className="col g1 aifs jcfs">
				<p className="simple-text">{category.name}</p>
				<p className="sub-text">{category.description}</p>
			</div>
			<div className="row g1 aic jcfe">
				<IconButton
					variant="tertiary"
					size="md"
					type="submit"
					href={icons.pencil}
					nestinglevel={nestingLevel}
					onClick={() => addObjectToStore(setModals, updateCategoryModal)}
				/>
				<IconButton
					variant="tertiary"
					type="submit"
					size="md"
					href={icons.trashcan}
					nestinglevel={nestingLevel}
					onClick={() => deleteCategory()}
				/>
			</div>
		</li>
	)
}

export default CategoryCard
