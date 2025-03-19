import { HTMLInputTypeAttribute } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  type?: HTMLInputTypeAttribute
  label?: string
}

const FormFieldGroup = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, type = 'text', label } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldGroup
