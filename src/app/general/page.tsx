"use client";

import { ColorsType, Menus } from "@/common/interface";
import Menu from "@/components/Menu";
import PickCard from "@/components/PickCard";
import ThemeTitle from "@/components/ThemeTitle";
import React, { useEffect, useState } from "react";
import { TbCrystalBall } from "react-icons/tb";

const GeneralPage = () => {
  const [card, setCard] = useState<string>("");
  const [colors, setColors] = useState<ColorsType>({
    from: "slate-900",
    to: "gray-950",
  });

  const menuItems: Menus[] = [
    {
      label: "1",
      href: "/general/1",
    },
    {
      label: "3",
      href: "/general/3",
    },
    {
      label: "7",
      href: "/general/7",
    },
    {
      label: "10",
      href: "/general/10",
    },
    {
      label: "12",
      href: "/general/12",
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
      {!card ? (
        <div className="mb-10 mt-5 flex flex-col items-center justify-center gap-10 md:mb-20">
          <ThemeTitle
            theme="General"
            Icon={TbCrystalBall}
            initialColors={colors}
          />
          <Menu data={menuItems} sub={true} setCard={setCard} />
        </div>
      ) : (
        <PickCard limit={card.toString()} path={"general"} themes={false} />
      )}
    </>
  );
};

export default GeneralPage;
