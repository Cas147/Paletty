import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function generatePalette(color: string) {
    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [ {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: generatePrompt(color)
      }]
  })

  return completion.data.choices[0]?.message?.content
}

function generatePrompt(color:string) {
  return `generate one palette of color that includes ${color}  as a dominant color`;
}