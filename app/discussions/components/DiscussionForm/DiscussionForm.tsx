import getCategories from "app/categories/queries/getCategories"
import { LabeledInput, LabeledTextArea } from "app/core/components"
import { Form, FormProps } from "app/core/components/Form/Form"
import { useQuery } from "blitz"
import { z } from "zod"
import { Dropdown } from "../../../core/components/Dropdown/Dropdown"
import { LabeledCheckbox } from "../../../core/components/LabeledCheckbox/LabeledCheckbox"
import { LabeledRadioButton } from "../../../core/components/LabeledRadioButton/LabeledRadioButton"
export { FORM_ERROR } from "app/core/components/Form/Form"

export function DiscussionForm<S extends z.ZodType<any, any>>(
	props: FormProps<S>
) {
	const labeledProps = {
		className: "w100 col simple-text",
	}
	const outerProps = {
		className: "w100 col g1",
	}
	const radioButtonLabelProps = {
		className: "row g1 simple-text",
	}
	const [categories] = useQuery(getCategories, {})

	return (
		<Form<S> {...props}>
			<div className="w100 col g1">
				<p className="pre-text">Base info</p>
				<div className="w100 row aifs g2">
					<Dropdown name="category" label="Category" options={categories} />
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
				<p className="pre-text">Visibility</p>
				<LabeledRadioButton
					name="visibility"
					label="Public"
					value="Public"
					labelProps={radioButtonLabelProps}
					outerProps={outerProps}
				/>
				<LabeledRadioButton
					name="visibility"
					label="Private"
					value="Private"
					labelProps={radioButtonLabelProps}
					outerProps={outerProps}
				/>
				<p className="pre-text">Additional info</p>
				<LabeledCheckbox
					name="voting"
					label="Allow voting at this discussion"
					labelProps={radioButtonLabelProps}
					outerProps={outerProps}
				/>
			</div>
		</Form>
	)
}
