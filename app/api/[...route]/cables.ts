import { z } from 'zod'
import { Hono } from 'hono'
import { createId } from '@paralleldrive/cuid2'
import { zValidator } from '@hono/zod-validator'

import { db } from '@/lib/db'

import { insertCableSchema } from '@/features/cables/schema'

const app = new Hono()
  .post('/', zValidator('json', insertCableSchema), async (c) => {
    const validatedFields = c.req.valid('json')

    if (!validatedFields) return c.json({ error: 'Campos inválidos' }, 400)

    await db.cable.create({
      data: {
        id: createId(),
        ...validatedFields,
      },
    })

    return c.json({ success: 'Cabo criado' }, 201)
  })
  .patch(
    '/:id',
    zValidator('param', z.object({ id: z.string().optional() })),
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
