import DashboardTabs from '@/components/modules/dashboard/DashboardTabs'

type Props = {
  children: React.ReactNode
}

export default async function Layout(props: Props) {
  const { children } = props

  return (
    <main className="w-full flex-1">
      <div className="mx-auto max-w-[1292px] px-4 py-6 md:px-6">
        <DashboardTabs />
        {children}
      </div>
    </main>
  )
}
