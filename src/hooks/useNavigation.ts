import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function useNavigation() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  return { searchParams, pathname, router }
}

export default useNavigation
