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
import { motion } from "framer-motion";

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
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        className="flex items-center pl-4"
      >
        <Link
          className="flex items-center gap-x-1 text-xl font-bold scale-125"
          href="/landing_page"
        >
          <BrainCircuit />
          SelfLearn.
        </Link>
      </motion.div>

      <div className="flex items-center font-bold">
        <ul className="flex space-x-6 items-end">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <Link href="/home">
              <div className="hover:text-gray-300">Home</div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <Link href="/create_new_wiki">
              <div className="hover:text-gray-300">Create</div>
            </Link>
          </motion.div>
        </ul>
      </div>

      {session ? (
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
          className="flex items-center pr-4"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex font-bold border-none">
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
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
          className="flex items-center"
        >
          <Link href={"/login"}>Sign In</Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
