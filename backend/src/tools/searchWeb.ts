import { LLMToolDeclaration } from '../types/agent'

// the actual function — logic lives here
export async function searchWeb(args: { query: string }): Promise<string> {
  const { query } = args
  return `Search results for "${query}": Bitcoin is 2800 dollars todays`
}

// what you send to the LLM so it knows this tool exists
export const searchWebDeclaration: LLMToolDeclaration = {
  name: "searchWeb",
  description: "Search the web for information about any topic",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "search text"
      }
    },
    required: ["query"]
  }
}