import { z } from 'zod'

export const insertCableSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatório' })
    .min(1, { message: 'Nome é obrigatório' }),
  position: z
    .array(z.number())
    .length(2, { message: 'Posição [x, y] é obrigatório' }),
})

export type InsertCableFormValues = z.infer<typeof insertCableSchema>

export const insertCableDefaultValues: InsertCableFormValues = {
  name: '',
  position: [],
}

export const insertCablePropertySchema = z.object({
  id: z.string(),
  co2: z.string(),
  temperature: z.string(),
  humidity: z.string(),
})
