import getCategory from "app/api/queries/Category/getCategory"
import { CategoryService } from "app/api/services"
import { CategorySchema } from "app/core/validation"
import { useQuery } from "blitz"
import { FC } from "react"
import { CategoryForm } from "../../Form/children/CategoryForm"

const categoryService = new CategoryService()

interface UpdateCategoryModalProps {
	id_: number
}

export const UpdateCategoryModal: FC<UpdateCategoryModalProps> = (props) => {
	const { id_ } = props
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
			onSubmit={async (values) => {
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
