import { FieldType } from 'datocms-plugin-sdk'
import { DatoFieldType } from '../types'

export function normalizeResponseText(text: string, fieldType: FieldType) {
  switch (fieldType) {
    case DatoFieldType.structuredTextField: {
      const structuredText = [
        {
          type: 'paragraph',
          children: [
            {
              text,
            },
          ],
        },
      ]
      return structuredText
    }
    default: {
      return text
    }
  }
}
