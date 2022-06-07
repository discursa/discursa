import { Form, FormProps } from "app/core/components/Form/Form"
import { z } from "zod"
import { LabeledInput } from "../../LabeledInput/LabeledInput"
export { FORM_ERROR } from "app/core/components/Form"

export function ChangeAuthorForm<S extends z.ZodType<any, any>>(
	props: FormProps<S>
) {
	const labelProps = {
		className: "w100 col simple-text g1",
	}

	return (
		<Form<S> {...props}>
			<LabeledInput
				name="username"
				label="Username"
				inputSize="md"
				placeholder="Write new author name"
				labelProps={labelProps}
				styles="w100"
			/>
		</Form>
	)
}
