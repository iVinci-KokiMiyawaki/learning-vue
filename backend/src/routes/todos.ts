import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/", async (req: Request, res: Response) => {
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

router.delete("/:id", async (req: Request, res: Response) => {
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

export default router
