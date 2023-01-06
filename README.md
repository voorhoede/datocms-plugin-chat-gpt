# DatoCMS plugin: AI Content Generator

AI assistant to quickly generate realistic content based on keywords using ChatGPT v3 (OpenAI).

![](https://github.com/voorhoede/datocms-plugin-chat-gpt/raw/main/docs/chat-gpt-ai-content-generator-generated-text.png)

## Features

- Generate text using GPT-3
- Fill in text fields with generated text
- Generate text using a specific model
- Generate text using a specific prompt
- Generate text using a specific temperature
- Generate text using a specific max tokens

## Configuration
Add the plugin to your DatoCMS project, Settings > Plugins > Add new plugin > Search for "ChatGPT" > Install.

## Plugin settings
For this plugin you need to set an API key from the OpenAI API.
To get an API key from OpenAI, follow these steps:
1. Go to https://beta.openai.com/ and create an account
2. Go to https://beta.openai.com/account/api-keys and create a new API key
3. Copy the API key and paste it in the plugin settings
4. Save the plugin settings
5. You're ready to go!

Once you have set the API key, you can select a [model](https://beta.openai.com/docs/models),

### Expert Mode
Expert mode is a mode that allows you to use the full power of GPT-3. In this mode you can use a [temperature](https://algowriting.medium.com/gpt-3-temperature-setting-101-41200ff0d0be) and [max tokens](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them).
This mode is only available for the `davinci` models. If you want to calculate the tokens for your prompt, you can use this [tokenizer](https://beta.openai.com/tokenizer).

![](https://github.com/voorhoede/datocms-plugin-chat-gpt/raw/main/docs/chat-gpt-ai-content-generator-plugin-settings.png)

## Field settings
In the edit field settings you can select the ChatGPT field in the presentation tab and the ChatGPT options will be shown underneath the field.

![](https://github.com/voorhoede/datocms-plugin-chat-gpt/raw/main/docs/chat-gpt-ai-content-generator-field-settings.png)

![](https://github.com/voorhoede/datocms-plugin-chat-gpt/raw/main/docs/chat-gpt-ai-content-generator-field-settings-applied.png)

## Contributing

See [contributing.md](https://github.com/voorhoede/datocms-plugin-chat-gpt/blob/main/contributing.md).

## License

*MIT Licensed* by [De Voorhoede](https://www.voorhoede.nl).
