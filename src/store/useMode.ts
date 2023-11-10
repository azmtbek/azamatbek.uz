import { create } from 'zustand'

type Store = {
  mode: string
  setMode: (mode: string) => void
}


const useMode = create<Store>((set) => ({
  mode: 'simple',
  setMode: (mode) => set((state) => ({ mode: mode })),
}))

export default useMode