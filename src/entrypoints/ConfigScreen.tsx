import { useEffect, useState } from 'react'
import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import {
  Button,
  Canvas,
  TextField,
  Form,
  FieldGroup,
  SelectField,
  SwitchField,
} from 'datocms-react-ui'
import { Form as FormHandler, Field } from 'react-final-form'
import { Model } from 'openai/resources'
import OpenAIApi from 'openai'
import { ConfigParameters } from '../types'

type Props = {
  ctx: RenderConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  const [apiKey, setApiKey] = useState('')
  const [models, setModels] = useState<Model[] | null | void>(null)
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [expertMode, SetExpertMode] = useState(false)

  useEffect(() => {
    if (apiKey) {
      const client = new OpenAIApi({
        apiKey: apiKey || (ctx.plugin.attributes.parameters.apiKey as string),
        dangerouslyAllowBrowser: true,
      })

      const fetchModels = async () => {
        const data = await client.models.list()
        setModels(data.data)
      }

      fetchModels().catch((error) => {
        console.error(error)
      })
    }
  }, [apiKey, ctx.plugin.attributes.parameters.apiKey])

  useEffect(() => {
    if (models) {
      const modelOptions = models.map((model) => ({
        label: model.id,
        value: model.id,
      }))
      setOptions(modelOptions)
    }
  }, [models])

  return (
    <Canvas ctx={ctx}>
      <div>
        <FormHandler<ConfigParameters>
          initialValues={ctx.plugin.attributes.parameters}
          validate={(values: ConfigParameters) => {
            if ('apiKey' in values && values.apiKey) {
              setApiKey(values.apiKey)
              return {}
            }

            if ('model' in values && values.model) {
              return {}
            }

            return {
              apiKey: 'This field is required!',
              model: 'Choose a language model!',
            }
          }}
          onSubmit={async (values: ConfigParameters) => {
            await ctx.updatePluginParameters(values)
            ctx.notice('Settings updated successfully!')
          }}
        >
          {({ handleSubmit, submitting, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field name="apiKey">
                  {({ input, meta: { error } }) => (
                    <TextField
                      id="apiKey"
                      label="OpenAI API key"
                      placeholder="sk-......."
                      hint={
                        <>
                          Please insert your OpenAI API key (it starts with{' '}
                          <code>sk-</code>
                          ). You can generate it{' '}
                          <a
                            href="https://beta.openai.com/docs/quickstart/add-your-api-key"
                            target="_blank"
                            rel="noreferrer"
                          >
                            from here
                          </a>
                        </>
                      }
                      required
                      error={error}
                      {...input}
                    />
                  )}
                </Field>
                {apiKey && (
                  <Field name="model">
                    {({ input, meta: { error } }) => (
                      <SelectField
                        id="model"
                        label="Model"
                        hint={
                          <>
                            Please select your OpenAI{' '}
                            <a
                              href="https://beta.openai.com/docs/models"
                              target="_blank"
                              rel="noreferrer"
                            >
                              model
                            </a>
                          </>
                        }
                        selectInputProps={{
                          options,
                        }}
                        required
                        error={error}
                        {...input}
                      />
                    )}
                  </Field>
                )}

                <Field name="expertMode">
                  {({ input, meta: { error } }) => (
                    <SwitchField
                      id="expertMode"
                      name="expertMode"
                      label="Toggle expert mode"
                      hint="check this if you want to use the plugin in expert mode"
                      value={expertMode}
                      onChange={(value) => {
                        SetExpertMode(value)
                        input.onChange(value)
                      }}
                      error={error}
                    />
                  )}
                </Field>

                {expertMode && (
                  <>
                    <Field name="temperature">
                      {({ input, meta: { error } }) => (
                        <TextField
                          id="temperature"
                          label="Temperature"
                          placeholder="0"
                          hint={
                            <>
                              Read more about{' '}
                              <a
                                href="https://algowriting.medium.com/gpt-3-temperature-setting-101-41200ff0d0be"
                                target="_blank"
                                rel="noreferrer"
                              >
                                temperature
                              </a>
                            </>
                          }
                          error={error}
                          {...input}
                        />
                      )}
                    </Field>

                    <Field name="maxTokens">
                      {({ input, meta: { error } }) => (
                        <TextField
                          id="maxTokens"
                          label="Max Tokens"
                          placeholder="1024"
                          hint={
                            <>
                              Read more about{' '}
                              <a
                                href="https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them"
                                target="_blank"
                                rel="noreferrer"
                              >
                                tokens
                              </a>
                            </>
                          }
                          error={error}
                          {...input}
                        />
                      )}
                    </Field>
                  </>
                )}
              </FieldGroup>
              <Button
                type="submit"
                fullWidth
                buttonSize="l"
                buttonType="primary"
                disabled={submitting || !dirty}
              >
                Save settings
              </Button>
            </Form>
          )}
        </FormHandler>
      </div>
    </Canvas>
  )
}
