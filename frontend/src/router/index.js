import { createRouter, createWebHistory } from "vue-router"

// ルートコンポーネントをインポートする
import HomeView from "../views/HomeView.vue"
import TodoView from "../views/TodoView.vue"

// ルート定義
const routes = [
  { path: "/", component: HomeView },
  { path: "/todos", component: TodoView },
]

// ルーターインスタンスの作成
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
