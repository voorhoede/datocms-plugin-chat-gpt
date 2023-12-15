import OpenAIApi from 'openai'
import { ConfigParameters, FieldConfigParameters } from '../types'

export async function generateChatGPTText(
  parameters: FieldConfigParameters,
  config: ConfigParameters,
) {
  if (config.apiKey) {
    const client = new OpenAIApi({
      apiKey: config.apiKey,
      dangerouslyAllowBrowser: true,
    })

    try {
      const response = await client.completions.create({
        model: config.model.value,
        prompt: `Make a ${parameters.textOption.value} with ${parameters.characters} characters with the following keywords ${parameters.keywords}`,
        max_tokens: Number(config.maxTokens),
        temperature: Number(config.temperature),
      })

      return {
        statusCode: 200,
        text: response.choices[0].text.trim().replace(/^"(.*)"$/, '$1'),
        usage: response.usage,
      }
    } catch (e: any) {
      return {
        statusCode: e.status,
        text: e.message,
      }
    }
  }

  return null
}
