import { LabeledInput, LabeledTextArea } from "app/core/components"
import { Form, FormProps } from "app/core/components/Form/Form"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form/Form"

export function DiscussionForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const labeledProps = {
    className: "col simple-text",
  }

  return (
    <Form<S> {...props}>
      <LabeledInput
        name="name"
        label="Discussion name"
        placeholder="Write discussion name"
        inputSize="md"
        inputMode="text"
        styles="w100"
        labelProps={labeledProps}
      />
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
