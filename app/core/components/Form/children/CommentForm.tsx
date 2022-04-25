import { Form, FormProps } from "app/core/components/Form/Form"
import { z } from "zod"
import { LabeledTextArea } from "../../LabeledTextArea/LabeledTextArea"
export { FORM_ERROR } from "app/core/components/Form"

export function CommentForm<S extends z.ZodType<any, any>>(
	props: FormProps<S>
) {
	return (
		<Form<S> {...props}>
			<LabeledTextArea
				name="message"
				label=""
				placeholder="Write comment"
				labelProps=""
				styles="w100 h200"
			/>
		</Form>
	)
}
