import { create } from 'zustand'

type Store = {
  paths: string[],
  progress: number,
  addPath: (prev: string) => void
  resetPaths: () => void
}

const totalURLList = [
  '',
  '/middle-earth',
  '/thoughts-forest',
  '/project-mountains',
  '/contact-sea',
  '/fake-contact',
  '/why',
]
const extraURL = '/here'


const useHaveBeen = create<Store>((set) => ({
  paths: [''],
  progress: 0,
  addPath: (path) => set((state) => {
    if (!state.paths.some((p) => p === path)) {
      let p = 0;
      if (state.paths.length === 6) p = 100;
      else p = state.progress + 17;
      return ({ paths: [...state.paths, path], progress: p })
    }
    else return state
  }),
  resetPaths: () => set(() => ({ paths: [''], progress: 0 }))
}))

export const isInPath = (paths: string[], path: string) => paths.some((curr) => path === curr)
// export const haveProgressed = (paths: string[]) => {

//   if (paths.length === 7) return 100
//   else ()
//   paths.some(curr => extraURL === curr)
// }

export default useHaveBeen