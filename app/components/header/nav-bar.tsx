import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="hidden items-center gap-2 text-sm text-slate-300 md:flex md:text-[15px]">
        <li>
          <Link href="/" className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.08] hover:text-white">
            Home
          </Link>
        </li>
        <li>
          <Link href="#about" className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.08] hover:text-white">
            About
          </Link>
        </li>
        <li>
          <Link href="#skills" className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.08] hover:text-white">
            Skills
          </Link>
        </li>
        <li>
          <Link href="#projects" className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.08] hover:text-white">
            Projects
          </Link>
        </li>
        <li>
          <Link href="#contact" className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.08] hover:text-white">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
