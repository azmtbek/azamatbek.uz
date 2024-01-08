import { create } from 'zustand'

type Store = {
  mode: string
  setMode: (mode: string) => void
}

// modes: 'simple', 'adventure'

const useMode = create<Store>((set) => ({
  mode: 'adventure',
  setMode: (mode) => set((state) => ({ mode: mode })),
}))

export default useMode