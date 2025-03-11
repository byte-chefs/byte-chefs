import { checkAuth } from '@/utils/supabase/checkAuth'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await checkAuth()

  return <>{children}</>
}
