"use client";

import CircularLightEffect from "../ui/circular-light-effect";
import BarIcon from "./bar-icon";
import NavBar from "./nav-bar";
import ThemeToggle from "../ui/theme-toggle";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between p-2 md:justify-center md:gap-8">
        {/* navigation links  */}
        <NavBar />

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <BarIcon />
        </div>

        <div className="absolute -top-40 -z-10 xl:-top-48 xl:left-1/3">
          <CircularLightEffect />
        </div>
      </div>
    </header>
  );
}
