import { create } from 'zustand'
import type { SessionUser } from '@p5-dfsjs/shared'

type UIStore = {
  user: SessionUser | null
  isMenuOpen: boolean
  setUser: (user: SessionUser | null) => void
  toggleMenu: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  user: null,
  isMenuOpen: false,
  setUser: (user) => set({ user }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}))
