import React, { useState } from 'react'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import {
  Button,
  Canvas,
  FieldGroup,
  Form,
  SelectField,
  Spinner,
  TextField,
} from 'datocms-react-ui'
import { Field, Form as FormHandler } from 'react-final-form'
import { generateChatGPTText } from '../utils/generateChatGPTText'
import { ConfigParameters, FieldConfigParameters, UsageProps } from '../types'
import { textOptions } from '../data/options'

type Props = {
  ctx: RenderFieldExtensionCtx
}

const usageProps: UsageProps = {
  prompt_tokens: 0,
  completion_tokens: 0,
  total_tokens: 0,
}

export default function FieldExtension({ ctx }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [fieldsFilled, setFieldsFilled] = useState(false)
  const [usage, setUsage] = useState(usageProps)
  const [isGenerated, setIsGenerated] = useState(false)

  const fieldId = ctx.field.id
  const pluginParams = ctx.plugin.attributes.parameters as ConfigParameters
  const initialValue =
    pluginParams.fields && pluginParams.fields[fieldId as never]
      ? pluginParams.fields[fieldId as never]
      : {}

  return (
    <Canvas ctx={ctx}>
      <FormHandler<FieldConfigParameters>
        initialValues={initialValue}
        validate={(values: FieldConfigParameters) => {
          if (
            'keywords' in values &&
            values.keywords &&
            'characters' in values &&
            values.characters &&
            'textOption' in values &&
            values.textOption
          ) {
            setFieldsFilled(true)
          }
          return {}
        }}
        onSubmit={async (values: FieldConfigParameters) => {
          const fields = { ...pluginParams.fields, [fieldId]: values }

          await ctx.updatePluginParameters({
            ...pluginParams,
            fields,
          })

          setIsLoading(true)
          setUsage(usageProps)
          const response = await generateChatGPTText(values, pluginParams)
          setIsLoading(false)

          if (response?.statusCode === 200) {
            setIsGenerated(true)
            setUsage(response.usage ?? usageProps)
            await ctx.setFieldValue(ctx.fieldPath, response?.text)
          } else {
            await ctx.alert(`Error: ${response?.text}`)
          }
        }}
      >
        {({ handleSubmit, submitting }) => (
          <Form onSubmit={handleSubmit} className="form">
            <FieldGroup className="form__field-group">
              <Field name="textOption">
                {({ input, meta: { error } }) => (
                  <SelectField
                    id="textOption"
                    label="Text Options"
                    hint="Choose the text option you want to use"
                    selectInputProps={{
                      options: textOptions,
                    }}
                    error={error}
                    {...input}
                  />
                )}
              </Field>

              <Field name="characters">
                {({ input, meta: { error } }) => (
                  <TextField
                    id="characters"
                    label="Max characters"
                    placeholder="140"
                    hint="Maximum number of characters"
                    error={error}
                    {...input}
                  />
                )}
              </Field>

              <Field name="keywords">
                {({ input, meta: { error } }) => (
                  <TextField
                    id="keyword(s)"
                    label="Keyword(s)"
                    placeholder="cat, dog, fish"
                    hint="Separate each value with a comma"
                    error={error}
                    {...input}
                  />
                )}
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              buttonSize="xs"
              disabled={submitting || !fieldsFilled || isLoading}
            >
              {isLoading && <Spinner size={18} />}{' '}
              {`${isLoading ? 'Generating Text' : 'Generate Text'}`}
            </Button>
          </Form>
        )}
      </FormHandler>

      {usage && isGenerated && (
        <div style={{ marginTop: '1rem' }}>
          <p>
            Usage: prompt tokens:
            {usage.prompt_tokens}, completion tokens:
            {usage.completion_tokens}, total tokens:
            {usage.total_tokens}
          </p>
        </div>
      )}
    </Canvas>
  )
}
