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

  console.log(cables)

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button size="sm" className="w-fit" onClick={onOpen}>
          <Plus size={16} className="text-white mr-2" />
          Adicionar cabo
        </Button>
      </div>

      <div className="flex flex-col gap-2 justify-center">
        {/* {cables.map((cable, index) => (
          <CardCable
            key={index}
            {...cable}
            grainPropType={type as GrainPropsType}
          />
        ))} */}
      </div>
    </div>
  )
}
