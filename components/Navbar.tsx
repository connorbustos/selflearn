import Link from "next/link";

interface NavbarProps {
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const disableNavbar = ["/login", "/signup"];

  if (disableNavbar.includes(currentPath)) {
    return null;
  }

  return (
    <nav className="text-black py-3 px-6 flex items-end border-b border-gray-300">
      <div className="text-xl font-bold mr-8 flex items-end scale-125">
        SelfLearn
      </div>
      <ul className="flex space-x-4 items-end">
        <Link href="/search">
          <div className="hover:text-gray-300">Search</div>
        </Link>
        <Link href="/create_new_wiki">
          <div className="hover:text-gray-300">Create</div>
        </Link>
        <Link href="/view_all_wikis">
          <div className="hover:text-gray-300">View All Wikis</div>
        </Link>
        <Link href="/profile">
          <div className="hover:text-gray-300">Profile</div>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
