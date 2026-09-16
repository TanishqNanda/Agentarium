export type AgentStatus = "idle" | "thinking" | "using_tool" | "done" | "error"

export type AgentRole = "programmer" | "manager" | "marketing" | "researcher"

export interface Tool {
  name: string
  description: string
  execute: (input: string) => Promise<string>
}

export interface Agent {
  id: string
  name: string
  role: AgentRole
  status: AgentStatus
  tools: Tool[]
  currentTask: string | null
}

export interface Task {
  agentId: string
  goal: string
  createdAt: Date
}

export interface TaskResult {
  agentId: string
  goal: string
  result: string
  steps: string[]
  completedAt: Date
}