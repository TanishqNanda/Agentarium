import { LLMToolDeclaration } from '../types/agent'

// the actual function — logic lives here
export async function searchWeb(query: string): Promise<string> {
  // placeholder — real Serper/Tavily API in Stage 2
  return `Search results for "${query}": CSS flexbox is the modern standard. Use display:flex on parent, then align-items:center and justify-content:center.`
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
        description: "The search query to look up"
      }
    },
    required: ["query"]
  }
}