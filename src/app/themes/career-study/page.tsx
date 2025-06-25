"use client";

import { ColorsType, Menus } from "@/common/interface";
import Menu from "@/components/Menu";
import PickCard from "@/components/PickCard";
import ThemeTitle from "@/components/ThemeTitle";
import React, { useEffect, useState } from "react";
import { MdOutlineSchool } from "react-icons/md";
import { PiSuitcaseSimpleFill } from "react-icons/pi";

const page = () => {
  const [card, setCard] = useState<string>("");
  const [colors, setColors] = useState<ColorsType>({
    from: "slate-900",
    to: "gray-950",
  });

  const menuItems: Menus[] = [
    {
      label: "1",
      href: "/themes/career-study",
    },
    {
      label: "3",
      href: "/themes/career-study",
    },
    {
      label: "5",
      href: "/themes/career-study",
    },
    {
      label: "7",
      href: "/themes/career-study",
    },
    {
      label: "10",
      href: "/themes/career-study",
    },
    {
      label: "12",
      href: "/themes/career-study",
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
        <PickCard limit={card} path={"career-study"} themes={true} />
      ) : (
        <div className="mb-10 mt-5 flex flex-col items-center justify-center gap-10 md:mb-20">
          <ThemeTitle
            theme="Career/Study"
            Icon={PiSuitcaseSimpleFill}
            Icon2={MdOutlineSchool}
            initialColors={colors}
          />
          <Menu data={menuItems} sub={true} setCard={setCard} />
        </div>
      )}
    </>
  );
};

export default page;
