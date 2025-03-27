'use client'

import type React from 'react'

import { useState } from 'react'
import { User, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { createClient } from '@/utils/supabase/client'

type ProfileImageUploadProps = {
  value: string
  onChange: (value: string) => void
  isCreate?: boolean
}

export default function ProfileImageUpload(props: ProfileImageUploadProps) {
  const { value, onChange, isCreate } = props

  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File too large: Image must be less than 5MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type: Please upload an image file')
      return
    }

    setIsUploading(true)

    try {
      const supabase = createClient()

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, { upsert: true })

      if (error) {
        throw error
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('profiles').getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (error) {
      console.log(error)
      toast.error('Upload failed: Something went wrong. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={value || undefined} />
          <AvatarFallback>
            <User className="text-foreground h-8 w-8" />
          </AvatarFallback>
        </Avatar>

        {!isCreate && value && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center">
        <label
          htmlFor="profile-image"
          className="text-primary-default dark:text-primary-lighter text-md cursor-pointer hover:underline"
        >
          {!isCreate && (value ? 'Change image' : 'Upload image')}
          <input
            id="profile-image"
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept="image/*"
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  )
}
