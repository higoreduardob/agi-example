import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetCables = () => {
  const query = useQuery({
    queryKey: ['cables'],
    queryFn: async () => {
      const response = await client.api.cables.$get()

      if (!response.ok) {
        throw new Error('Falha para obter os cabos')
      }

      const { data } = await response.json()
      return data
    },
  })

  return query
}
