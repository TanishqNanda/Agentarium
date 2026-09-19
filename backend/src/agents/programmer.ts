import { Agent, TaskResult, LLMToolDeclaration } from '../types/agent'
import { searchWeb, searchWebDeclaration } from '../tools/searchWeb'

export const programmerAgent: Agent = {
  id: 'programmer',
  name: 'Nerdy',
  role: 'programmer',
  status: 'idle',
  tools: [],
  currentTask: null
}

const toolExecutors: Record<string, (input: string) => Promise<string>> = {
  searchWeb: searchWeb
}

const registeredTools: LLMToolDeclaration[] = [searchWebDeclaration]

const LLM_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`

async function callLLM(contents: object[]): Promise<any> {
  const response = await fetch(LLM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      tools: [{ function_declarations: registeredTools }]
    })
  })

  if (!response.ok) {
    throw new Error(`LLM request failed: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.candidates[0].content.parts[0]
}

export async function runProgrammerAgent(goal: string): Promise<TaskResult> {
  programmerAgent.status = 'thinking'
  programmerAgent.currentTask = goal

  const steps: string[] = []
  steps.push(`Goal received: ${goal}`)

  const conversation = [
    {
      role: 'user',
      parts: [{ text: `You are Nerdy, a programmer AI agent. Goal: ${goal}` }]
    }
  ]

  const initialResponse = await callLLM(conversation)

  let finalResult: string

  if (initialResponse.functionCall) {
    const toolName: string = initialResponse.functionCall.name
    const toolInput: string = initialResponse.functionCall.args.query

    steps.push(`Tool called: ${toolName} — input: "${toolInput}"`)

    const executor = toolExecutors[toolName]
    if (!executor) throw new Error(`Tool "${toolName}" not found in executor map`)

    const toolOutput = await executor(toolInput)
    steps.push(`Tool executed successfully`)

    const toolResultResponse = await callLLM([
      ...conversation,
      {
        role: 'model',
        parts: [{ functionCall: { name: toolName, args: { query: toolInput } } }]
      },
      {
        role: 'user',
        parts: [{ functionResponse: { name: toolName, response: { result: toolOutput } } }]
      }
    ])

    finalResult = toolResultResponse.text
    steps.push(`Final answer generated using tool output`)

  } else {
    finalResult = initialResponse.text
    steps.push(`LLM answered directly without tool`)
  }

  programmerAgent.status = 'done'
  programmerAgent.currentTask = null

  return {
    agentId: 'programmer',
    goal,
    result: finalResult,
    steps,
    completedAt: new Date()
  }
}