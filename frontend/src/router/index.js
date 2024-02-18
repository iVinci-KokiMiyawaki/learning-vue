import { createRouter, createWebHistory } from "vue-router"

// ルートコンポーネントをインポートする
import LoginView from "../views/LoginView.vue"
import HomeView from "../views/HomeView.vue"
import TodoView from "../views/TodoView.vue"
import { supabase } from "../libs/supabase"

// ルート定義
const routes = [
  { path: "/", component: HomeView, meta: { title: "Home" } },
  { path: "/login", component: LoginView, meta: { title: "Login" } },
  { path: "/todos", component: TodoView, meta: { title: "ToDo" } },
]

// ルーターインスタンスの作成
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (to.path === "/todos" && !user) {
    next("/login")
  } else if (to.path === "/login" && user) {
    next("/")
  } else {
    next()
  }
})

export default router
