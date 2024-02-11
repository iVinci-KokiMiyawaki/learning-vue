import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get("/api/todos", async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/api/todos", async (req: Request, res: Response) => {
  try {
    const { title, description, userId } = req.body
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        userId,
        status: "pending",
      },
    })
    res.json(newTodo)
  } catch (error) {
    res.status(400).json({ error: "リクエストの処理に失敗しました" })
  }
})

app.delete("/api/todos/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await prisma.todo.delete({
      where: { id },
    })
    res.json({ message: "ToDoが正常に削除されました" })
  } catch (error) {
    res.status(404).json({ error: "ToDoが見つかりません" })
  }
})

app.get("/api/users/:userId/todos", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const todos = await prisma.todo.findMany({
      where: { userId },
    })
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
