"use client";

import CircularLightEffect from "../ui/circular-light-effect";
import BarIcon from "./bar-icon";
import NavBar from "./nav-bar";

export default function Header() {
  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-panel-strong flex items-center justify-between rounded-full px-4 py-3 md:justify-center md:gap-8 md:px-6">
        {/* navigation links  */}
        <NavBar />

        <div className="flex items-center gap-4 md:hidden">
          <BarIcon />
        </div>

        <div className="absolute -top-28 left-1/2 -z-10 hidden -translate-x-1/2 xl:block">
          <CircularLightEffect />
        </div>
      </div>
    </header>
  );
}
