import { z } from 'zod'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { db } from '@/lib/db'

import {
  insertCablePropertySchema,
  insertCableSchema,
} from '@/features/cables/schema'

const app = new Hono()
  .get('/hello', (c) => {
    return c.text('Hono!')
  })
  .post('/', zValidator('json', insertCableSchema), async (c) => {
    const validatedFields = c.req.valid('json')

    if (!validatedFields) return c.json({ error: 'Campos inválidos' }, 400)

    await db.cable.create({
      data: {
        ...validatedFields,
      },
    })

    return c.json({ success: 'Cabo criado' }, 201)
  })
  .post(
    '/properties',
    zValidator('json', insertCablePropertySchema),
    async (c) => {
      const validatedFields = c.req.valid('json')

      if (!validatedFields) return c.json({ error: 'Campos inválidos' }, 400)

      return c.json({ success: 'Propriedade criada' }, 200)
    }
  )
  .patch(
    '/:id',
    zValidator('param', z.object({ id: z.number().optional() })),
    zValidator('json', insertCableSchema),
    async (c) => {
      const { id } = c.req.valid('param')
      const validatedFields = c.req.valid('json')

      if (!id) {
        return c.json({ error: 'Identificador não encontrado' }, 400)
      }

      if (!validatedFields) return c.json({ error: 'Campos inválidos' }, 400)
      await db.cable.update({
        where: { id },
        data: { ...validatedFields },
      })

      return c.json({ success: 'Cabo atualizado' }, 200)
    }
  )
  .get('/', async (c) => {
    const data = await db.cable.findMany({
      select: {
        id: true,
        name: true,
        position: true,
        properties: {
          select: {
            temperature: true,
            humidity: true,
            carboneDioxide: true,
            inactiveSensors: true,
          },
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return c.json({ data }, 200)
  })

export default app
