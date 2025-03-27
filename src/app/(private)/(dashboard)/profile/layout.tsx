import { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'

type Props = {
  children: ReactNode
}

export default function ProfileLayout(props: Props) {
  const { children } = props

  return (
    <div>
      <h2 className="mb-3 font-bold md:mb-6">Profile</h2>
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto w-full max-w-2xl">{children}</Card>
      </div>
    </div>
  )
}
