import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { CircleUser, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const disableNavbar = ["/login", "/signup"];

  const { data: session } = useSession();

  if (disableNavbar.includes(currentPath)) {
    return null;
  }

  return (
    <nav className="text-black py-3 px-6 flex justify-between border-b border-gray-300">
      <div className="flex items-center">
        <Link href="/search">
          <div className="text-xl font-bold mr-8 scale-125">SelfLearn</div>
        </Link>
        <ul className="flex space-x-4 items-end">
          <Link href="/create_new_wiki">
            <div className="hover:text-gray-300">Create</div>
          </Link>
          <Link href="/view_all_wikis">
            <div className="hover:text-gray-300">View All Wikis</div>
          </Link>
        </ul>
      </div>

      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-x-2">
              {session.user?.name}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <Link href={"/profile"}>
              <DropdownMenuItem className="flex gap-x-2">
                <CircleUser />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="flex gap-x-2"
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center">
          <Link href={"/login"}>Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
