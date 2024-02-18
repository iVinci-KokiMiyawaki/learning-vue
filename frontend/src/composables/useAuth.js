import { ref } from "vue"

import { supabase } from "../libs/supabase" // Supabaseクライアントをインポート

const user = ref(null)

export function useAuth() {
  const checkUser = async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser()
    user.value = currentUser
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  return { user, checkUser, signOut }
}
