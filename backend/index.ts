import express, { Request, Response } from "express"

const app = express()
const PORT: number = parseInt(process.env.PORT as string, 10) || 5555

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
