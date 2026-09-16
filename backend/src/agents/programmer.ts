import { Agent, TaskResult } from '../types/agent'
import searchWeb from '../tools/searchWeb'

// the agent object — just data, no logic here
export const programmerAgent: Agent = {
  id: 'programmer',
  name: 'Alex',
  role: 'programmer',
  status: 'idle',
  tools: [searchWeb],
  currentTask: null
}

export async function runProgrammerAgent(goal: string): Promise<TaskResult> {

  // update agent state
  programmerAgent.status = 'thinking'
  programmerAgent.currentTask = goal

  // direct fetch to Gemini AI Studio — no SDK
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are Alex, a programmer AI agent. Your goal: ${goal}. Be concise and technical.`
              }
            ]
          }
        ]
      })
    }
  )

  // response.json() gives you the raw Gemini response object
  // the actual text is buried inside this nested structure
  const data = await response.json()
  const result: string = data.candidates[0].content.parts[0].text

  // TS types — result is string, we told TS that above
  programmerAgent.status = 'done'
  programmerAgent.currentTask = null

  // this shape must match TaskResult interface you wrote
  return {
    agentId: 'programmer',
    goal,
    result,
    steps: ['Received goal', 'Called Gemini', 'Got response'],
    completedAt: new Date()
  }
}