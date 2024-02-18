declare namespace Express {
  export interface Request {
    user?: {
      supabaseId: string
      email?: string
      // 他のユーザー関連のプロパティをここに追加
    }
  }
}
