import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.get("/:userId/todos", async (req: Request, res: Response) => {
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

export default router
