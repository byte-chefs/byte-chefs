'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { dashboardTabs } from '@/components/modules/dashboard/DashboardTabs/data'

const DashboardTabs = () => {
  const pathname = usePathname()

  return (
    <div className="mb-8 inline-flex gap-2 rounded-lg border border-solid p-2">
      {dashboardTabs.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={cn(
            'dark:bg-primary/30 bg-primary/50 hover:bg-primary/80 flex items-center gap-1 rounded-lg px-4 py-2 text-white',
            item.path === pathname && 'bg-primary dark:bg-primary'
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default DashboardTabs
