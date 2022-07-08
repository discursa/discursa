import { CategoryService } from "app/categories/services"
import { CategoryType } from "app/categories/types"
import { CategorySchema } from "app/core/validation"
import { useRouter } from "blitz"
import { FC } from "react"
import { CategoryForm } from "../CategoryForm/CategoryForm"

interface CreateCategoryModalProps {
	categories: CategoryType[]
}

export const CreateCategoryModal: FC<CreateCategoryModalProps> = (props) => {
	const { categories } = props
	const router = useRouter()
	const categoryService = new CategoryService()

	return (
		<CategoryForm
			className="w100 col g1"
			submitText="Create"
			schema={CategorySchema}
			initialValues={{
				name: "",
				description: "",
			}}
			onSubmit={async (values) => {
				await categoryService.create(values, categories, router)
			}}
		/>
	)
}
