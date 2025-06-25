"use client";

import { ColorsType } from "@/common/interface";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";

interface TitleProps {
  theme: string;
  Icon: IconType;
  Icon2?: IconType;
  initialColors: ColorsType;
}

const ThemeTitle = ({ initialColors, theme, Icon, Icon2 }: TitleProps) => {
  const [colors, setColors] = useState<ColorsType>({
    from: "slate-900",
    to: "gray-950",
  });

  useEffect(() => {
    setColors(initialColors);
  }, [initialColors]);

  return (
    <div className="group relative">
      <div
        className={`absolute -inset-1.5 rounded-lg bg-gradient-to-r opacity-50 from-${colors.to} via-${colors.via} to-${colors.from} blur-sm transition duration-1000 group-hover:opacity-100`}
      ></div>
      <div
        className={`relative flex flex-row items-center justify-center gap-x-2 rounded-lg bg-gray-950/70 p-2 backdrop-blur-sm`}
      >
        <Icon className="animate-pulse text-xl text-white md:text-4xl" />
        <h1
          className={`text-shadow-lg text-lg uppercase tracking-wider text-white md:text-4xl`}
        >
          Theme: {theme}
        </h1>
        {Icon2 ? (
          <Icon2 className="animate-pulse text-xl text-white md:text-4xl" />
        ) : (
          <Icon className="animate-pulse text-xl text-white md:text-4xl" />
        )}
      </div>
    </div>
  );
};

export default ThemeTitle;
