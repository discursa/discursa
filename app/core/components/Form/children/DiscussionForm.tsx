import getCategories from "app/api/queries/Category/getCategories"
import { LabeledInput, LabeledTextArea } from "app/core/components"
import { Form, FormProps } from "app/core/components/Form/Form"
import { useQuery } from "blitz"
import { z } from "zod"
import { Dropdown } from "../../Dropdown/Dropdown"
export { FORM_ERROR } from "app/core/components/Form/Form"

export function DiscussionForm<S extends z.ZodType<any, any>>(
	props: FormProps<S>
) {
	const labeledProps = {
		className: "w100 col simple-text",
	}
	const [categories] = useQuery(getCategories, {})

	return (
		<Form<S> {...props}>
			<div className="w100 row aifs g2">
				<Dropdown name="category" label="Categoty" options={categories} />
				<LabeledInput
					name="name"
					label="Name"
					placeholder="Write discussion name"
					inputSize="md"
					inputMode="text"
					styles="w100"
					labelProps={labeledProps}
				/>
			</div>
			<LabeledTextArea
				name="message"
				label="Your message"
				placeholder="Write first discussion message"
				styles="w100"
				labelProps={labeledProps}
			/>
		</Form>
	)
}
