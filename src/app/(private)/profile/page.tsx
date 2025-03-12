import { getUser } from '@/actions/user/getUser'

export default async function ProfilePage() {
  const data = await getUser()
  return (
    <main>
      <h1>My profile</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
