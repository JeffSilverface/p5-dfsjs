import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { SessionUser } from '@p5-dfsjs/shared'

type UIStore = {
  user: SessionUser | null
  isMenuOpen: boolean
  setUser: (user: SessionUser | null) => void
  toggleMenu: () => void
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      user: null,
      isMenuOpen: false,
      setUser: (user) => set({ user }, false, 'setUser'),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen }), false, 'toggleMenu'),
    }),
    { name: 'UI Store' }
  )
)
