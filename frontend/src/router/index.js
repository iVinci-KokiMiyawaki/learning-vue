import { createRouter, createWebHistory } from "vue-router"

// ルートコンポーネントをインポートする
import LoginView from "../views/LoginView.vue"
import HomeView from "../views/HomeView.vue"
import TodoView from "../views/TodoView.vue"
import { supabase } from "../libs/supabase"

// ルート定義
const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/todos", component: TodoView },
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

  // ログインしていない場合はログインページにリダイレクトする
  // ログイン済みの場合にloginページにアクセスした場合はホームページにリダイレクトする
  if (to.path !== "/login" && !user) {
    next("/login")
  } else if (to.path === "/login" && user) {
    next("/")
  } else {
    next()
  }
})

export default router
