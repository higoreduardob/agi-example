import { z } from 'zod'
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { db } from '@/lib/db'

import {
  insertCableJsonSchema,
  insertCablePropertySchema,
  insertCableSchema,
} from '@/features/cables/schema'

const app = new Hono()
  .get('/hello', (c) => {
    return c.text('Hono!')
  })
  .get('/properties/json', async (c) => {
    const data = await db.cPJson.findMany({})

    return c.json({ data })
  })
  .post(
    '/properties/json/:cableId',
    zValidator('json', insertCableJsonSchema),
    zValidator('param', z.object({ cableId: z.string().optional() })),
    async (c) => {
      const { cableId } = c.req.valid('param')
      const validatedFields = c.req.valid('json')

      if (!cableId) {
        return c.json({ error: 'Identificador não encontrado' }, 400)
      }

      if (!validatedFields) return c.json({ error: 'Campos inválidos' }, 400)

      await db.cPJson.create({
        data: { ...validatedFields, cableId: Number(cableId) },
      })

      return c.json({ success: 'Propriedade cadastrada' }, 201)
    }
  )
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
