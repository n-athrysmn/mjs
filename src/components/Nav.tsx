"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menus } from "@/common/interface";
import { FaHome } from "react-icons/fa";

const Nav = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const main = pathSegments[0] || "";
  const sub = pathSegments[1] || "";
  const subsub = pathSegments[2] || "";

  const MainNavItem: Menus[] = [
    {
      label: "General",
      href: "general",
    },
    {
      label: "Theme",
      href: "themes",
    },
    {
      label: "Yes / No",
      href: "yes-no",
    },
    {
      label: "Daily Tarot",
      href: "daily",
    },
    {
      label: "AI Tarot",
      href: "ai-tarot",
    },
    {
      label: "Spread Explain",
      href: "explain",
    },
    {
      label: "Cards Archive",
      href: "archive",
    },
  ];

  const SubNavItem: Menus[] = [
    {
      label: "Love",
      href: "love",
    },
    {
      label: "Career/Study",
      href: "career-study",
    },
    {
      label: "Finance",
      href: "finance",
    },
    {
      label: "Health",
      href: "health",
    },
    {
      label: "General",
      href: "general",
    },
    {
      label: "Daily",
      href: "daily",
    },
  ];

  const currentMenu = MainNavItem.find((item) => item.href === main);
  const currentSubMenu = SubNavItem.find((item) => item.href === sub);

  return (
    <>
      {pathSegments.length > 0 ? (
        <div className="mx-5 flex flex-row items-center justify-between md:mx-20 md:my-5">
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
            <Link href="/" className="mt-5 animate-pulse">
              <Image src="/logo.png" alt="logo" width={30} height={30} />
            </Link>
            <p className="hidden text-center text-sm uppercase tracking-widest text-white md:block md:text-sm">
              <span className="opacity-70">MJAYN</span>Surreptitious
            </p>
            <p className="block text-center text-sm uppercase tracking-widest text-white md:hidden md:text-sm">
              <span className="opacity-70">MJS</span>
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 md:gap-10">
            <Link
              href="/"
              className="flex flex-row items-center gap-2 text-sm uppercase text-white hover:tracking-widest md:text-base"
            >
              <FaHome /> Home
            </Link>
            {currentMenu && sub && (
              <>
                <span className="text-xs text-white">{">"}</span>
                <Link
                  href={`/${currentMenu.href}`}
                  className="text-sm uppercase text-white opacity-75 hover:tracking-widest md:text-base"
                >
                  {currentMenu.label}
                </Link>
              </>
            )}
            {currentSubMenu && subsub && currentMenu && (
              <>
                <span className="text-xs text-white">{">"}</span>
                <Link
                  href={`/${currentMenu.href}/${currentSubMenu.href}`}
                  className="text-sm text-white opacity-55 md:text-base"
                >
                  {currentSubMenu.label}
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 bg-transparent">
          <Link href="/" className="mt-5 animate-pulse">
            <Image src="/logo.png" alt="logo" width={80} height={80} />
          </Link>
          <p className="text-center text-xl uppercase tracking-widest text-white md:text-2xl">
            <span className="opacity-70">Welcome to</span> MJAYNSurreptitious
          </p>
        </div>
      )}
    </>
  );
};

export default Nav;
