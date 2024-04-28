import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { BrainCircuit, CircleUser, LogOut } from "lucide-react";
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
    <nav className="font-Proxima-Nova py-3 px-6 flex justify-between border-b border-gray-300">
      <div className="flex items-center">
        <Link href="/landing_page">
          <div className="flex items-center gap-x-1 text-xl font-bold mr-8 scale-125">
            <BrainCircuit />
            SelfLearn.
          </div>
        </Link>
      </div>

      <div className="flex items-center font-bold">
        <ul className="flex space-x-4 items-end">
          <Link href="/create_new_wiki">
            <div className="hover:text-gray-300">Create</div>
          </Link>
          <Link href="/home">
            <div className="hover:text-gray-300">Home</div>
          </Link>
        </ul>
      </div>

      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-x-2 font-bold">
              {session.user?.name}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <Link href={"/profile"}>
              <DropdownMenuItem className="flex gap-x-2 font-bold">
                <CircleUser />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="flex gap-x-2 font-bold"
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
