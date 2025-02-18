import { create } from 'zustand'

import { GrainPropsType } from '@/types/enum'

type GrainPropsTypeState = {
  type: string
  onChangeType: (type: string) => void
}

export const useFilterGrainPropsType = create<GrainPropsTypeState>((set) => ({
  type: GrainPropsType.TEMPERATURE,
  onChangeType: (type) => set({ type }),
}))
