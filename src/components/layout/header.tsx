import Link from "next/link";
import { SearchBar } from "../search-bar";
import { AirVent } from "lucide-react";

export function Header() {
  return (
    <header className="w-full p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          {/* <Image
            src="/youtube.svg"
            alt="YouTume Logo"
            width={32}
            height={32}
            priority
          /> */}
          <AirVent className="w-6 h-6" />
          <span className="text-xl font-bold">YouTume</span>
        </Link>
        <div className="hidden sm:block flex-1 max-w-xl">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
