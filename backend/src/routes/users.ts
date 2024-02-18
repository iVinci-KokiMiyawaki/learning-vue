import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.post("/sync-user", async (req: Request, res: Response) => {
  const { supabaseId, email, name } = req.body
  try {
    const user = await prisma.user.upsert({
      where: { supabaseId },
      update: { email, name },
      create: { supabaseId, email, name },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
