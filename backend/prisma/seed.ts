import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // ユーザーのシードデータを作成
  const user = await prisma.user.create({
    data: {
      // Userモデルのフィールドに合わせてください
      name: "Alice",
      email: "alice@example.com",
      // 他の必要なフィールド...
    },
  })

  // Todoのシードデータを作成
  await prisma.todo.createMany({
    data: [
      {
        userId: user.id,
        title: "Prismaを学ぶ",
        description: "Prismaの基本的な使い方を学ぶ",
        status: "pending",
      },
      {
        userId: user.id,
        title: "買い物リストを作成",
        description: "週末の買い物リストを作る",
        status: "completed",
      },
      // 他のTodoデータ...
    ],
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
