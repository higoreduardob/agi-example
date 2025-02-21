import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/hono'

export const useGetCablesProperties = () => {
  const query = useQuery({
    queryKey: ['cables-properties'],
    queryFn: async () => {
      const response = await client.api.cables.properties.json.$get()

      if (!response.ok) {
        throw new Error('Falha para obter os dados')
      }

      const { data } = await response.json()
      return data
    },
  })

  return query
}
