'use client'

// import { GrainPropsType } from '@/types/enum'

// import { useFilterGrainPropsType } from '@/hooks/use-filters'

// import { CardCable } from '@/components/card-cable'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useNewCable } from '@/features/cables/hooks/use-new-cable'
// import { useGetCables } from '@/features/cables/api/use-get-cables'
import { useGetCablesProperties } from '@/features/cables/api/use-get-cables-properties'

export default function Home() {
  const { onOpen } = useNewCable()

  const cablesQuery = useGetCablesProperties()
  const cables = cablesQuery.data || []

  // const isLoading = cablesQuery.isLoading

  // const { type } = useFilterGrainPropsType()

  if (cablesQuery.isLoading) {
    return null
  }

  if (!cables) {
    return null
  }

  console.log(cables)

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button size="sm" className="w-fit" onClick={onOpen}>
          <Plus size={16} className="text-white mr-2" />
          Adicionar cabo
        </Button>
      </div>

      <div className="bg-black text-white">
        {/* {cables.map((cable, index) => (
          <CardCable
            key={index}
            {...cable}
            grainPropType={type as GrainPropsType}
          />
        ))} */}
        {cables.map((cable, index) => (
          <div key={index} className="p-4 border rounded-lg shadow">
            {/* <h3 className="text-lg font-semibold">Cable ID: {cable.cableId}</h3> */}
            <pre className="bg-gray-100 p-2 rounded text-xs">
              {JSON.stringify(cable.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
