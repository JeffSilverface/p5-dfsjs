import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { SessionUser } from "@/types/user.types";

type UIStore = {
  user: SessionUser | null;
  isMenuOpen: boolean;
  setUser: (user: SessionUser | null) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      user: null,
      isMenuOpen: false,
      setUser: (user) => set({ user }, false, "setUser"),
      toggleMenu: () =>
        set(
          (state) => ({ isMenuOpen: !state.isMenuOpen }),
          false,
          "toggleMenu",
        ),
      closeMenu: () => set({ isMenuOpen: false }, false, "closeMenu"),
    }),
    { name: "UI Store" },
  ),
);
