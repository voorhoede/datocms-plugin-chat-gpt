import React from 'react'
import {
  Button, Canvas, FieldGroup, Form, SelectField, TextField
} from 'datocms-react-ui'
import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Form as FormHandler, Field } from 'react-final-form';
import { ConfigParameters, FieldConfigParameters } from '../types';
import { textOptions } from '../data/options'

type Props = {
  ctx: RenderManualFieldExtensionConfigScreenCtx
}

export default function ChatGPTConfigScreen({ ctx }: Props) {
  const parameters = ctx.parameters as ConfigParameters;
  const fieldId = ctx.pendingField.id as string;
  const initialValue = parameters.fields && parameters.fields[fieldId as never] ? parameters.fields[fieldId as never] : {};

  return (
    <Canvas ctx={ctx}>
      <FormHandler<FieldConfigParameters>
        initialValues={initialValue}
        validate={(values: FieldConfigParameters) => {
          if ('keywords' in values && values.keywords) {
            return {};
          }

          if ('characters' in values && values.characters) {
            return {};
          }

          if ('textOption' in values && values.textOption) {
            return {};
          }

          return {
            keywords: 'This field is required!',
            characters: 'This field is required!',
            textOption: 'This field is required!',
          };
        }}
        onSubmit={async (values: FieldConfigParameters) => {
          const fields = { ...parameters.fields, [fieldId]: values };

          await ctx.setParameters({ ...parameters, fields });
          await ctx.notice('Settings updated successfully!');
        }}
      >
        {({ handleSubmit, submitting, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field name="textOption">
                {({ input, meta: { error } }) => (

                  <SelectField
                    id="textOption"
                    label="Text Options"
                    hint="Choose the text option you want to use"
                    selectInputProps={{
                      options: textOptions,
                    }}
                    required
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
                    hint="Separate each value with a comma."
                    required
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
                    hint="Maximum number of characters to generate."
                    required
                    error={error}
                    {...input}
                  />
                )}
              </Field>
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
    </Canvas>
  );
}
