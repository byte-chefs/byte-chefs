import { Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

const Spinner = (props: React.HTMLAttributes<SVGSVGElement>) => {
  const { className, ...rest } = props

  return <Loader className={cn('animate-spin', className)} {...rest} />
}

export default Spinner
