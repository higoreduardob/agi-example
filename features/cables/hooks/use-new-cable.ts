import { create } from 'zustand'

type NewCableState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewCable = create<NewCableState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
