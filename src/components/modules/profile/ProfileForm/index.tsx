'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import ProfileImageUpload from '@/components/modules/profile/ProfileImageUpload'
// import AllergenSelector from '@/components/modules/profile/AllergenSelector'
import { useProfileForm } from './hooks/use-profile-form'
import Link from 'next/link'
import ROUTES from '@/app/constants/routes'

type Props = {
  isCreate?: boolean
}

const ProfileForm: FC<Props> = (props) => {
  const { isCreate = false } = props

  const router = useRouter()

  const { form, action, handleSubmitWithAction } = useProfileForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <fieldset className="space-y-6" disabled={isCreate}>
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <ProfileImageUpload
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    value={field.value}
                    onChange={field.onChange}
                    isCreate={isCreate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="aboutMe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Me</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[120px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="allergens"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allergens</FormLabel>
                <FormControl>
                  <AllergenSelector
                    value={field.value || []}
                    onChange={field.onChange}
                    isCreate={isCreate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className="flex justify-end gap-4">
            {isCreate ? (
              <Button asChild>
                <Link href={ROUTES.PROFILE_EDIT}>Edit profile</Link>
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => router.push('/profile')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={action.isPending}>
                  {action.isPending ? <Spinner /> : 'Save Changes'}
                </Button>
              </>
            )}
          </div>
        </fieldset>
      </form>
    </Form>
  )
}

export default ProfileForm
