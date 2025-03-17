import Link from 'next/link'
import ROUTES from '@/app/constants/routes'

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <h1>404</h1>
      <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <div>
        <Link href={ROUTES.HOMEPAGE}>Go Home</Link>
      </div>
    </div>
  )
}
