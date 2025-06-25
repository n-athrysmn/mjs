"use client";

import { Menus } from "@/common/interface";
import React from "react";
import Menu from "@/components/Menu";

const page = () => {
  const menuItems: Menus[] = [
    {
      label: "Love",
      href: "/themes/love",
      bgImage: "/love.png",
    },
    {
      label: "Career/Study",
      href: "/themes/career-study",
      bgImage: "/career.png",
    },
    {
      label: "Finance",
      href: "/themes/finance",
      bgImage: "/finance.png",
    },
    {
      label: "Health",
      href: "/themes/health",
      bgImage: "/health.png",
    },
  ];

  return (
    <div className="my-20 flex flex-col items-center justify-center md:my-0 md:h-full">
      <Menu data={menuItems} />
    </div>
  );
};

export default page;
