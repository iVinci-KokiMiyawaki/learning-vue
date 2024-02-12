import express from "express"
import todosRoutes from "./src/routes/todos"
import usersRoutes from "./src/routes/users"

const app = express()
app.use(express.json())

app.use("/api/todos", todosRoutes)
app.use("/api/users", usersRoutes)

const PORT: number = parseInt(process.env.PORT as string, 10) || 5555
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
