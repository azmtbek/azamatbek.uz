import { create } from 'zustand'

type Store = {
  paths: string[]
  addPath: (prev: string) => void
  resetPaths: () => void
}


const useHaveBeen = create<Store>((set) => ({
  paths: [''],
  addPath: (path) => set((state) => ({ paths: [...state.paths, path] })),
  resetPaths: () => set(() => ({ paths: [''] }))
}))

export const isInPath = (paths: string[], path: string) => paths.some((curr) => path === curr)

export default useHaveBeen