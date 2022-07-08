import getCategory from "app/categories/queries/getCategory"
import { CategoryService } from "app/categories/services"
import { CategoryFormValuesType } from "app/categories/types"
import { CategorySchema } from "app/core/validation"
import { useQuery } from "blitz"
import { FC } from "react"
import { CategoryForm } from "../../Form/children/CategoryForm"
import { UpdateCategoryModalProps } from "./UpdateCategoryModal.types"

export const UpdateCategoryModal: FC<UpdateCategoryModalProps> = (props) => {
	const { id_ } = props
	const categoryService = new CategoryService()
	const [category, { setQueryData }] = useQuery(
		getCategory,
		{
			id_: id_,
		},
		{
			staleTime: Infinity,
		}
	)

	return (
		<CategoryForm
			className="w100 col g1"
			submitText="Update"
			schema={CategorySchema}
			initialValues={category}
			onSubmit={async (values: CategoryFormValuesType) => {
				await categoryService.update(
					values,
					category,
					() => console.log(1),
					setQueryData,
					() => console.log(2)
				)
			}}
		/>
	)
}
