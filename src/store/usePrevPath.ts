import { create } from 'zustand'

type Store = {
  path: string,
  setPath: (prev: string) => void
}


const usePrevPath = create<Store>((set) => ({
  path: '',
  setPath: (prevPath) => set((state) => ({ path: prevPath })),
}))

export default usePrevPath