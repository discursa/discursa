import { Form, FormProps } from "app/core/components/Form/Form"
import { z } from "zod"
import { LabeledInput } from "../../LabeledInput/LabeledInput"
import { LabeledRadioButton } from "../../LabeledRadioButton/LabeledRadioButton"
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
			<LabeledInput
				name="name"
				type="text"
				label="Thread name"
				placeholder="Write thread name"
				inputSize="md"
				labelProps={labeledProps}
				styles="w100"
			/>
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
		</Form>
	)
}
