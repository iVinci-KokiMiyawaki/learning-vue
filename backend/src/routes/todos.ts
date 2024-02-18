import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

import { authenticateToken } from "../middleware/authenticate"

router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const supabaseId = req.user?.supabaseId

    // SupabaseのユーザーIDに基づいてPrismaのユーザーを検索
    const user = await prisma.user.findUnique({
      where: { supabaseId },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // ユーザーに紐づくtodosを取得
    const todos = await prisma.todo.findMany({
      where: { userId: user.id },
    })
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/", authenticateToken, async (req: Request, res: Response) => {
  const supabaseId = req.user?.supabaseId
  const { title, description } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { supabaseId },
    })
    if (!user) {
      return res.status(404).json({ error: "ユーザーが見つかりません" })
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: user.id, // ユーザーIDを使ってTodoを作成
        status: "pending",
      },
    })
    res.json(newTodo)
  } catch (error) {
    res.status(400).json({ error: "リクエストの処理に失敗しました" })
  }
})

router.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const supabaseId = req.user?.supabaseId
    const id = parseInt(req.params.id)

    // SupabaseIdを使ってユーザーを見つける
    const user = await prisma.user.findUnique({
      where: { supabaseId },
    })
    if (!user) {
      return res.status(404).json({ error: "ユーザーが見つかりません" })
    }

    // Todoを見つける
    const todo = await prisma.todo.findUnique({
      where: { id },
    })

    // Todoが存在し、かつログインユーザーに属しているか確認
    if (!todo || todo.userId !== user.id) {
      return res.status(404).json({ error: "ToDoが見つかりません" })
    }

    // Todoの削除
    await prisma.todo.delete({
      where: { id },
    })
    res.json({ message: "ToDoが正常に削除されました" })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
