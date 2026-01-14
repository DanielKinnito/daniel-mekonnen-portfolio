import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="z-10 gap-8 text-sm md:text-base text-gray-400 hidden md:flex items-center">
        <li>
          <Link href="/" className="hover:text-neon-green transition-colors duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link href="#about" className="hover:text-neon-green transition-colors duration-200">
            About
          </Link>
        </li>
        <li>
          <Link href="#skills" className="hover:text-neon-green transition-colors duration-200">
            Skills
          </Link>
        </li>
        <li>
          <Link href="#projects" className="hover:text-neon-green transition-colors duration-200">
            Projects
          </Link>
        </li>
        <li>
          <Link href="#contact" className="hover:text-neon-green transition-colors duration-200">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
