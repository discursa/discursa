import { LabeledInput, LabeledTextArea } from "app/core/components"
import { Form, FormProps } from "app/core/components/Form/Form"
import { z } from "zod"
import { LabeledRadioButton } from "../../LabeledRadioButton/LabeledRadioButton"
export { FORM_ERROR } from "app/core/components/Form/Form"

export function QuestionForm<S extends z.ZodType<any, any>>(
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

	return (
		<Form<S> {...props}>
			<div className="w100 col g1">
				<p className="pre-text">Base info</p>
				<LabeledInput
					name="name"
					label="Name"
					placeholder="Write question name"
					inputSize="md"
					inputMode="text"
					styles="w100"
					labelProps={labeledProps}
				/>
				<LabeledTextArea
					name="description"
					label="Description"
					placeholder="Write question description"
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
			</div>
		</Form>
	)
}
