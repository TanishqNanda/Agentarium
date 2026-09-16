import { Tool } from '../types/agent'

const searchWeb: Tool = {
  name: "searchWeb",
  description: "Search the web for any information given a query string",
  execute: async (input: string): Promise<string> => {
    // placeholder for now — real search later
    return `Search results for "${input}": This is a placeholder response. Real search coming in Stage 2.`
  }
}

export default searchWeb