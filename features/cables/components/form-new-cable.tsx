import {
  insertCableDefaultValues,
  InsertCableFormValues,
} from '@/features/cables/schema'

import { useNewCable } from '@/features/cables/hooks/use-new-cable'
import { useCreateCable } from '@/features/cables/api/use-create-cable'

import { FormCable } from '@/features/cables/components/form-cable'

export const FormNewCable = () => {
  const { isOpen, onClose } = useNewCable()

  const mutation = useCreateCable()

  const onSubmit = (values: InsertCableFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <FormCable
      defaultValues={insertCableDefaultValues}
      isOpen={isOpen}
      isDisabled={mutation.isPending}
      onSubmit={onSubmit}
      handleClose={onClose}
    />
  )
}
