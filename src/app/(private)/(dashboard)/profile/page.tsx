import ProfileForm from '@/components/modules/profile/ProfileForm'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { getAuthUserInfo } from '@/actions/auth/getAuthUserInfo'

export default async function Profile() {
  const user = await getAuthUserInfo()

  return (
    <>
      <CardHeader>
        <CardTitle>{user?.email}</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileForm isCreate />
      </CardContent>
    </>
  )
}
