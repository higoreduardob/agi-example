import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  InsertCableFormValues,
  insertCableSchema,
} from '@/features/cables/schema'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormSheet } from '@/components/form-sheet'

type Props = {
  id?: string
  defaultValues?: InsertCableFormValues
  isOpen: boolean
  isDisabled: boolean
  isLoading?: boolean
  onSubmit: (values: InsertCableFormValues) => void
  handleClose: () => void
}

export const FormCable = ({
  id,
  defaultValues,
  isOpen,
  isDisabled,
  isLoading,
  onSubmit,
  handleClose,
}: Props) => {
  const form = useForm<InsertCableFormValues>({
    resolver: zodResolver(insertCableSchema),
    defaultValues,
    shouldFocusError: true,
    reValidateMode: 'onChange',
    mode: 'all',
  })

  const handleSubmit = (values: InsertCableFormValues) => {
    onSubmit(values)
  }

  useEffect(() => {
    form.reset()
  }, [isOpen])

  return (
    <FormSheet
      id={id}
      formId="form-cable"
      title={id ? 'Editar informações do cabo' : 'Novo cabo'}
      description="Preencha todos os campos abaixo, e ao finalizar clique em salvar."
      isOpen={isOpen}
      handleClose={handleClose}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      <Form {...form}>
        <form
          id="form-cable"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 pt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isDisabled}
                    placeholder="Nome do cabo"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Posição do cabo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value.join(', ') || ''}
                    disabled={isDisabled}
                    onChange={(event) => {
                      const inputValue = event.target.value
                      const parsedValues = inputValue
                        .split(',')
                        .map((val) => val.trim()) // Remove espaços extras
                        .map((val) => Number(val)) // Converte para número
                        .filter((val) => !isNaN(val)) // Filtra valores inválidos

                      field.onChange(parsedValues) // Atualiza o estado do formulário
                    }}
                    placeholder="Posição do cabo x, y"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormSheet>
  )
}
