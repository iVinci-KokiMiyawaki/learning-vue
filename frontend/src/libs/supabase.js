import { createClient } from "@supabase/supabase-js"

// Supabaseの設定
const SUPABASE_URL = "http://localhost:54321"
const SUPABASE_KEY = "..."
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export { supabase }
