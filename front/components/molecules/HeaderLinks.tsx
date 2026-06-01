"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { useUIStore } from "@/store/ui.store";

export function HeaderLinks() {
  const closeMenu = useUIStore((state) => state.closeMenu);

  return (
    <nav className="flex flex-col md:flex-row gap-4 items-end md:items-center p-4 md:p-0 h-full">
      <Link className="hover:text-purple-500" href="/feed" onClick={closeMenu}>
        Articles
      </Link>
      <Link className="hover:text-purple-500" href="/topics" onClick={closeMenu}>
        Thèmes
      </Link>
      <Link className="hover:text-red-500" href="/logout" onClick={closeMenu}>
        Se déconnecter
      </Link>
      <Separator className="md:hidden mt-auto" />
      <Link href="/profile" onClick={closeMenu}>
        <Avatar size="lg" className="cursor-pointer hover:ring-2 hover:ring-purple-500">
          <AvatarImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Atkinson_Rowan_crop.jpg/250px-Atkinson_Rowan_crop.jpg"
            alt="Mr Bean"
          />
          <AvatarFallback>RA</AvatarFallback>
        </Avatar>
      </Link>
    </nav>
  );
}
