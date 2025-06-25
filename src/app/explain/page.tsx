"use client";

import { Menus } from "@/common/interface";
import React from "react";
import Menu from "@/components/Menu";

const page = () => {
  const menuItems: Menus[] = [
    {
      label: "General",
      href: "/explain/general",
      bgImage: "/general.png",
    },
    {
      label: "Daily",
      href: "/explain/daily",
      bgImage: "/daily.png",
    },
    {
      label: "Love",
      href: "/explain/love",
      bgImage: "/love.png",
    },
    {
      label: "Career/Study",
      href: "/explain/career-study",
      bgImage: "/career.png",
    },
    {
      label: "Finance",
      href: "/explain/finance",
      bgImage: "/finance.png",
    },
    {
      label: "Health",
      href: "/explain/health",
      bgImage: "/health.png",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center md:mb-20 md:h-full">
      <Menu data={menuItems} />
    </div>
  );
};

export default page;
