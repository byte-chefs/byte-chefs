import ProfileForm from '@/components/modules/profile/ProfileForm'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function EditProfilePage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm />
      </CardContent>
    </>
  )
}
