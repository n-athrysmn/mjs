"use client";

import { ColorsType, Menus } from "@/common/interface";
import Menu from "@/components/Menu";
import PickCard from "@/components/PickCard";
import ThemeTitle from "@/components/ThemeTitle";
import React, { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";

const page = () => {
  const [card, setCard] = useState<string>("");
  const [colors, setColors] = useState<ColorsType>({
    from: "slate-900",
    to: "gray-950",
  });

  const menuItems: Menus[] = [
    {
      label: "3",
      href: "/themes/finance",
    },
    {
      label: "5",
      href: "/themes/finance",
    },
    {
      label: "7",
      href: "/themes/finance",
    },
    {
      label: "10",
      href: "/themes/finance",
    },
    {
      label: "12",
      href: "/themes/finance",
    },
  ];

  useEffect(() => {
    const themeSaved = localStorage.getItem("theme");
    if (themeSaved) {
      const theme = JSON.parse(themeSaved);
      setColors(theme);
    }
  }, []);

  return (
    <>
      {card ? (
        <PickCard limit={card} path={"finance"} themes={true} />
      ) : (
        <div className="mb-10 mt-5 flex flex-col items-center justify-center gap-10 md:mb-20">
          <ThemeTitle
            theme="Finance"
            Icon={GiTakeMyMoney}
            initialColors={colors}
          />
          <Menu data={menuItems} sub={true} setCard={setCard} />
        </div>
      )}
    </>
  );
};

export default page;
