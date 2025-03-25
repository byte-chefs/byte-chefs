'use client'

import type React from 'react'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-toastify'

type RecipeImageUploadProps = {
  value: string
  onChange: (value: string) => void
}

export default function RecipeImageUpload({ value, onChange }: RecipeImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large: Image must be less than 5MB');
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type: Please upload an image file')
      return
    }

    setIsUploading(true)

    try {
      const reader = new FileReader()

      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        onChange(dataUrl)
        setIsUploading(false)
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.log(error);
      toast.error('Upload failed: Something went wrong. Please try again.')
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-4 relative">
      {value ? (
        <div className="relative">
          <img
            src={value || '/placeholder.svg'}
            alt="Recipe"
            className="h-[300px] w-full rounded-lg object-cover"
          />
          <Button
            variant="transparent"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          <input
            type="file"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={handleUpload}
            accept="image/*"
            disabled={isUploading}
          />
        </div>
      )}
    </div>
  )
}
