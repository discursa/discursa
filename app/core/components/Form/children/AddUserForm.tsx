import { z } from "zod"
import { LabeledInput } from "../../LabeledInput/LabeledInput"
import Form, { FormProps } from "../Form"

export function AddUserForm<S extends z.ZodType<any, any>>(
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
				placeholder="Write username"
				inputSize="md"
				inputMode="text"
				styles="w100"
				labelProps={labelProps}
			/>
		</Form>
	)
}
