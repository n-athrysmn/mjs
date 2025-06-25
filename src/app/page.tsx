"use client";

import { Menus } from "@/common/interface";
import Menu from "@/components/Menu";

export default function Home() {
  const menuItems: Menus[] = [
    {
      label: "General",
      href: "/general",
      bgImage: "/general.png",
    },
    {
      label: "Choose Theme",
      href: "/themes",
      bgImage: "/themes.png",
    },
    {
      label: "Yes / No",
      href: "/yes-no",
      bgImage: "/yes_no.png",
    },
    {
      label: "Daily Tarot",
      href: "/daily",
      bgImage: "/daily.png",
    },
    {
      label: "AI Tarot",
      href: "/ai-tarot",
      bgImage: "/AI.png",
    },
    {
      label: "Explain My Card",
      href: "/explain",
      bgImage: "/explain.png",
    },
    {
      label: "Cards Archive",
      href: "/archive",
      bgImage: "/archive.png",
    },
  ];

  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <Menu data={menuItems} />
    </div>
  );
}
