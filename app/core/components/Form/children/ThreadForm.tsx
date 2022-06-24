import { Form, FormProps } from "app/core/components/Form/Form"
import { z } from "zod"
import { LabeledInput } from "../../LabeledInput/LabeledInput"
import { LabeledRadioButton } from "../../LabeledRadioButton/LabeledRadioButton"
import { LabeledTextArea } from "../../LabeledTextArea/LabeledTextArea"
export { FORM_ERROR } from "app/core/components/Form"

export function ThreadForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
	const labeledProps = {
		className: "w100 col simple-text",
	}

	const radioButtonLabeledProps = {
		className: "w100 wor g1 simple-text",
	}

	const outerProps = {
		className: "w100 col g1",
	}

	return (
		<Form<S> {...props}>
			<div className="w100 col g1">
				<h3>Base info</h3>
				<LabeledInput
					name="name"
					type="text"
					label="Thread name"
					placeholder="Write thread name"
					inputSize="md"
					labelProps={labeledProps}
					styles="w100"
				/>
				<LabeledTextArea
					name="message"
					label="Thread message"
					placeholder="Write thread first message"
					labelProps={labeledProps}
					styles="w100"
				/>
			</div>
			<div className="w100 col g1">
				<h3>Visibility</h3>
				<LabeledRadioButton
					name="visibility"
					value="Public"
					label="Public"
					labelProps={radioButtonLabeledProps}
					outerProps={outerProps}
				/>
				<LabeledRadioButton
					name="visibility"
					value="Private"
					label="Private"
					labelProps={radioButtonLabeledProps}
					outerProps={outerProps}
				/>
			</div>
		</Form>
	)
}
