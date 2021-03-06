import { useState, ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../Button/Button"

export interface FormProps<S extends z.ZodType<any, any>>
	extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
	children?: ReactNode
	submitText?: string
	resetText?: string
	schema?: S
	onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
	initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
}

interface OnSubmitResult {
	FORM_ERROR?: string
	[prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
	children,
	submitText,
	resetText,
	schema,
	initialValues,
	onSubmit,
	...props
}: FormProps<S>) {
	const ctx = useForm<z.infer<S>>({
		mode: "onBlur",
		resolver: schema ? zodResolver(schema) : undefined,
		defaultValues: initialValues,
	})
	const [formError, setFormError] = useState<string | null>(null)

	return (
		<FormProvider {...ctx}>
			<form
				onSubmit={ctx.handleSubmit(async (values) => {
					const result = (await onSubmit(values)) || {}
					for (const [key, value] of Object.entries(result)) {
						if (key === FORM_ERROR) {
							setFormError(value)
						} else {
							ctx.setError(key as any, {
								type: "submit",
								message: value,
							})
						}
					}
				})}
				{...props}
			>
				{children}

				{formError && (
					<div className="red simple-text" role="alert">
						{formError}
					</div>
				)}
				<div className="row g1 top-space-sm">
					{submitText && (
						<Button variant="primary" type="submit" size="md">
							{submitText}
						</Button>
					)}
					{resetText && (
						<Button variant="secondary" type="reset" size="md">
							{resetText}
						</Button>
					)}
				</div>
			</form>
		</FormProvider>
	)
}

export default Form
