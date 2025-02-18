import { Loader2 } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

type Props = {
  id?: string
  formId: string
  title: string
  description: string
  isOpen: boolean
  isDisabled: boolean
  handleClose: () => void
  isLoading?: boolean
  children: React.ReactNode
}

export const FormSheet = ({
  id,
  formId,
  title,
  isOpen,
  isDisabled,
  description,
  handleClose,
  isLoading,
  children,
}: Props) => {
  const handleSubmit = () => {
    document
      .getElementById(formId)
      ?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="space-y-4 xs:w-fit w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isDisabled}
              className="sm:w-fit w-full"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isDisabled}
              className="sm:w-fit w-full"
            >
              {isDisabled && <Loader2 className="animate-spin size-4 mr-4" />}
              {id ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin size-4 text-muted-foreground" />
          </div>
        ) : (
          children
        )}
      </SheetContent>
    </Sheet>
  )
}
