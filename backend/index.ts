import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const app = express()

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

const PORT: number = parseInt(process.env.PORT as string, 10) || 5555
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
