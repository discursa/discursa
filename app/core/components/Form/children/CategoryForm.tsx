import { Form, FormProps } from "app/core/components/Form/Form"
import { z } from "zod"
import { LabeledInput } from "../../LabeledInput/LabeledInput"
export { FORM_ERROR } from "app/core/components/Form"

export function CategoryForm<S extends z.ZodType<any, any>>(
	props: FormProps<S>
) {
	const labelProps = {
		className: "w100 col simple-text g1",
	}

	return (
		<Form<S> {...props}>
			<LabeledInput
				name="name"
				label="Name"
				inputSize="md"
				placeholder="Write category name"
				labelProps={labelProps}
				styles="w100"
			/>
			<LabeledInput
				name="description"
				label="Description (optional)"
				inputSize="md"
				placeholder="Write category description (optional)"
				labelProps={labelProps}
				styles="w100"
			/>
		</Form>
	)
}
