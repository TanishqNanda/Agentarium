import { Agent, TaskResult, LLMToolDeclaration } from '../types/agent'
import { searchWeb, searchWebDeclaration } from '../tools/searchWeb'

export async function callLLM(goal : string ) : Promise<string> {
  const API_KEY = process.env.GEMINI_API_KEY
  const LLM_URL: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`                                                                                                          
  
  const tools : Array<LLMToolDeclaration> = [
  searchWebDeclaration
  ]
  
  const toolCallerObject: Record<string, (args: any) => Promise<unknown>> = {
  "searchWeb" : searchWeb
}

  const contents: any[] = [
    {
      role: "user",
      parts: [{ text: goal }],
    },
  ]

  //---------REact loop starts---------
  for (let i = 0; i < 10; i++) {
    console.log("---- iteration", i, "----")

    const payload = {
      systemInstruction: {
        parts: [{ text: `You are Nerdy, a programmer agent.
  When the user asks about anything current, external, or that you
  are not 100% certain about, you MUST call the searchWeb tool instead
  of answering from memory.` }],
      },
      contents: contents,
      tools: [
        { functionDeclarations: tools }
      ] ,
      generationConfig: {
        thinkingConfig: {
          thinkingLevel: 'medium',
        },
        maxOutputTokens: 1000,
      },
    };

    try {
      const response = await fetch(LLM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const body = await response.json()
      console.log("Gemini response:", JSON.stringify(body, null, 2))

      const part = body.candidates?.[0]?.content?.parts?.[0]

      if (!part) {
        console.error("No part in response:", JSON.stringify(body, null, 2))
        throw new Error("Malformed response from Gemini")
      }

      if (part.text) {
        console.log(`Text is ${part.text}`)
        return part.text      
      }

      if (part.functionCall) {
        console.log("Function call is ", part.functionCall.name)

        const fn = toolCallerObject[part.functionCall.name]
        if (!fn) {
          console.error("Unknown tool:", part.functionCall.name)
          throw new Error(`Unknown tool: ${part.functionCall.name}`)
        }

        const result = await fn(part.functionCall.args)
        console.log("Tool result:", result)

        contents.push({ role: "model", parts: [part] })
        contents.push({ role: "user", parts: [{ functionResponse: { name: part.functionCall.name, response: { result: result } } }] })

        continue
      }

      return "no text, no function call"
    } catch (err) {
      console.error("callLLM iteration failed at i =", i)
      console.error("Full error:", err)
      throw err
    }
  }

  return "hit max steps"
}