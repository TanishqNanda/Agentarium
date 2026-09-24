import { Router, Request, Response } from 'express'
import { callLLM } from '../agents/programmer'

const router = Router()

router.post('/:agentId/task', async (req: Request, res: Response) => {
  const { agentId } = req.params
  const { goal } = req.body

  if (!goal) {
    res.status(400).json({ error: 'goal is required' })
    return
  }

  if (agentId !== 'programmer') {
    res.status(404).json({ error: 'Agent not found' })
    return
  }

  try {
    const result = await callLLM(goal)
    res.json(result)
  } catch (err) {
    console.error("Route error:", err)
    res.status(500).json({ error: 'Agent failed', details: String(err) })
  }
})

export default router