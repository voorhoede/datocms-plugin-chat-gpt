import React, { useState } from 'react'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { Button, Canvas, Spinner } from 'datocms-react-ui'
import { generateChatGPTText } from '../utils/generateChatGPTText'
import {
  ChatGPTParameters,
  ConfigParameters,
  UsageProps
} from '../types'

type Props = {
  ctx: RenderFieldExtensionCtx;
};

const usageProps: UsageProps = {
  prompt_tokens: 0,
  completion_tokens: 0,
  total_tokens: 0
}

const fieldParamProps: ChatGPTParameters = {
  keywords: '',
  characters: 0,
  textOption: {
    label: '',
    value: ''
  }
}

export default function FieldExtension({ ctx }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [usage, setUsage] = useState(usageProps)
  const [isGenerated, setIsGenerated] = useState(false)

  const fieldId = ctx.field.id
  const fieldParams = ctx.parameters.fields && ctx.parameters.fields[fieldId as never] ? ctx.parameters.fields[fieldId as never] : fieldParamProps
  const pluginParams = ctx.plugin.attributes.parameters as ConfigParameters

  const handleClick = async () => {
    setIsLoading(true)
    const response = await generateChatGPTText(fieldParams, pluginParams)
    setIsLoading(false)

    if (response?.statusCode === 200) {
      setIsGenerated(true)
      setUsage(response.usage ?? usageProps)
      await ctx.setFieldValue(ctx.fieldPath, response?.text)
    } else {
      await ctx.alert(`Error: ${response?.text}`)
    }
  }

  return (
    <Canvas ctx={ctx}>
      <Button buttonSize='xs' onClick={handleClick} disabled={isLoading}>
        {isLoading && (<Spinner size={18} />)}
        {' '}
        {`${isLoading ? 'Generating Text' : 'Generate Text'}`}
      </Button>
      {usage && isGenerated && (
        <div style={{ marginTop: '1rem' }}>
          <p>
            Usage: prompt tokens:
            {usage.prompt_tokens}
            , completion tokens:
            {usage.completion_tokens}
            , total
            tokens:
            {usage.total_tokens}
          </p>
        </div>
      )}
    </Canvas>
  )
}
