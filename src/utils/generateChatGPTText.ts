import { Configuration, OpenAIApi } from 'openai';
import { ConfigParameters, FieldConfigParameters } from '../types';

export async function generateChatGPTText(
  parameters: FieldConfigParameters,
  config: ConfigParameters
) {
  if (config.apiKey) {
    const configuration = new Configuration({
      apiKey: config.apiKey,
    });
    const client = new OpenAIApi(configuration);

    try {
      const response = await client.createCompletion({
        model: config.model.value,
        prompt: `Make a ${parameters.textOption.value} with ${parameters.characters} characters with the following keywords ${parameters.keywords}`,
        max_tokens: 100,
        temperature: 0,
      });

      if (response.status === 200) {
        return {
          statusCode: response.status,
          text: response.data.choices[0].text?.trim(),
          usage: response.data.usage,
        };
      }
    } catch (e: any) {
      return {
        statusCode: e.response.status,
        text: e.response.data.error.message,
      };
    }
  }

  return null;
}
