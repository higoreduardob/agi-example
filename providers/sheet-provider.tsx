'use client'

import { useMountedState } from 'react-use'

import { FormNewCable } from '@/features/cables/components/form-new-cable'

export const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <FormNewCable />
    </>
  )
}
