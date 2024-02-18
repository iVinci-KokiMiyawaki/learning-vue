import { ref, onMounted } from "vue"

import { supabase } from "../libs/supabase" // Supabaseクライアントをインポート

const user = ref(null)

export function useAuth() {
  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) user.value = session.user
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  onMounted(() => {
    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })

    return () => {
      authListener?.unsubscribe()
    }
  })

  return { user, checkUser, signOut }
}
