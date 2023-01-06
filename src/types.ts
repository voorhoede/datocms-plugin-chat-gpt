export type FirstInstallationParameters = {
  apiKey: ''
  temperature: 0
  maxTokens: 1024
  model: {
    label: 'text-davinci-003'
    value: 'text-davinci-003'
  }
  fields: []
}

export type ValidParameters = {
  apiKey: string
  temperature: number
  maxTokens: number
  model: {
    label: string
    value: string
  }
  fields: Array<[string, string]>
}

export type ChatGPTParameters = {
  keywords: string
  characters: number
  textOption: {
    label: string
    value: string
  }
}

export type UsageProps = {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export type ConfigParameters = ValidParameters | FirstInstallationParameters

export type FieldConfigParameters = ChatGPTParameters
