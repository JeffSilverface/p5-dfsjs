import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export function HeaderLinks() {
  return (
    <nav className="flex flex-col md:flex-row gap-4 items-end md:items-center p-4 md:p-0 h-full">
      <Link className="hover:text-purple-500" href="/articles">
        Articles
      </Link>
      <Link className="hover:text-purple-500" href="/topics">
        Thèmes
      </Link>
      <Link className="hover:text-red-500" href="/logout">
        Se déconnecter
      </Link>
      <Separator className="md:hidden mt-auto" />
      <Avatar size="lg">
        <AvatarImage
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Atkinson_Rowan_crop.jpg/250px-Atkinson_Rowan_crop.jpg"
          alt="Mr Bean"
        />
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>
    </nav>
  );
}
