import { Request, Response, NextFunction } from "express"

import jwt from "jsonwebtoken"

interface DecodedToken {
  sub: string // JWTのsubject
  email?: string // オプショナルなemailフィールド
  // 他に必要なフィールドがあればここに追加
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: "Authorization header is missing" })
  const token = authHeader.split(" ")[1]
  const secret = process.env.SUPABASE_JWT_SECRET
  if (!secret) return res.status(500).json({ error: "JWT secret is not defined" })
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.sendStatus(403)
    const decodedToken = decoded as DecodedToken
    if (!decodedToken) return res.sendStatus(403)
    req.user = {
      supabaseId: decodedToken.sub,
      email: decodedToken.email,
    }
    next()
  })
}

export { authenticateToken }
