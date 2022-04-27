import { CategoryService } from "app/api/services"
import { CategoryType } from "app/core/types"
import { CategorySchema } from "app/core/validation"
import { useRouter } from "blitz"
import { FC } from "react"
import { CategoryForm } from "../../Form/children/CategoryForm"

const categoryService = new CategoryService()

interface CreateCategoryModalProps {
	categories: CategoryType[]
}

export const CreateCategoryModal: FC<CreateCategoryModalProps> = (props) => {
	const { categories } = props
	const router = useRouter()

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
