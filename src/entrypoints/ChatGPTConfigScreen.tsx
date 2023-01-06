import React from 'react'
import { Canvas } from 'datocms-react-ui'
import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk'

type Props = {
  ctx: RenderManualFieldExtensionConfigScreenCtx
}

export default function ChatGPTConfigScreen({ ctx }: Props) {
  return <Canvas ctx={ctx}>✅ Enabled ChatGPT for this field</Canvas>
}
