import Image from "next/image";
import { HeaderLinks } from "./HeaderLinks";
import { BurgerMenu } from "./BurgerMenu";

export function Header() {
  return (
    <header className="bg-gray-200 sticky top-0">
      <div className="max-w-5xl mx-auto flex flex-row justify-between items-center p-2">
        <Image
          src="/images/mdd.svg"
          alt="Mdd logo"
          width={100}
          height={100}
          loading="eager"
          style={{ height: "auto" }}
        />
        <div className="hidden md:flex">
          <HeaderLinks />
        </div>
        <div className="flex md:hidden">
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
}
