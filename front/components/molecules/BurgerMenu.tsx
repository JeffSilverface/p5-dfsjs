"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HeaderLinks } from "./HeaderLinks";
import { useUIStore } from "@/store/ui.store";

export function BurgerMenu() {
  const { isMenuOpen, toggleMenu, closeMenu } = useUIStore();

  return (
    <Sheet open={isMenuOpen} onOpenChange={(open) => !open && closeMenu()}>
      <SheetTrigger aria-label="Menu" onClick={toggleMenu}>
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col pt-12">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <HeaderLinks />
      </SheetContent>
    </Sheet>
  );
}
