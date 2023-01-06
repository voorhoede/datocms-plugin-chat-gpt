import React from 'react'
import { connect } from 'datocms-plugin-sdk'
import { PluginAttributes } from 'datocms-plugin-sdk/dist/types/SiteApiSchema'
import { render } from './utils/render'
import ChatGPTConfigScreen from './entrypoints/ChatGPTConfigScreen'
import ConfigScreen from './entrypoints/ConfigScreen'
import FieldExtension from './entrypoints/FieldExtension'

import 'datocms-react-ui/styles.css'
import './styles/index.css'

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  manualFieldExtensions() {
    return [
      {
        id: 'chatGPT',
        name: 'ChatGPT Field',
        type: 'addon',
        fieldTypes: ['text', 'string', 'structured_text'] as NonNullable<
          PluginAttributes['field_types']
        >,
        configurable: true,
      },
    ]
  },
  renderManualFieldExtensionConfigScreen(_, ctx) {
    return render(<ChatGPTConfigScreen ctx={ctx} />)
  },
  renderFieldExtension(id, ctx) {
    render(<FieldExtension ctx={ctx} />)
  },
})
