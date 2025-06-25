"use client";

import { ColorsType } from "@/common/interface";
import Link from "next/link";
import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { GrSettingsOption } from "react-icons/gr";

type ControlProps = {
  setTheme: Dispatch<SetStateAction<ColorsType>>;
};

const Controls = ({ setTheme }: ControlProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const iconRef = useRef<HTMLDivElement | null>(null);

  const themes: ColorsType[] = [
    {
      label: "Default",
      from: "slate-900",
      via: "neutral-900",
      to: "gray-950",
    },
    {
      label: "Purple-Pink",
      from: "indigo-500",
      via: "purple-500",
      to: "pink-500",
    },
    {
      label: "Blue-Green",
      from: "indigo-500",
      via: "sky-500",
      to: "emerald-500",
    },
    {
      label: "Yellow-Blue",
      from: "yellow-600",
      via: "blue-950",
      to: "neutral-900",
    },
    {
      label: "Purple-Yellow",
      from: "purple-500",
      via: "pink-500",
      to: "yellow-900",
    },
  ];

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setClicked((prev) => !prev);
    // setTimeout(() => setClicked(false), 3000);
  };

  useEffect(() => {
    const handleGlobalClick = (e: globalThis.MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setClicked(false);
      }
    };

    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const handleTheme = (selectedTheme: ColorsType) => {
    setTheme({
      from: selectedTheme.from,
      via: selectedTheme.via,
      to: selectedTheme.to,
    });
    localStorage.setItem("theme", JSON.stringify(selectedTheme));
  };

  return (
    <>
      {clicked && (
        <div className="motion-preset-focus fixed bottom-16 left-6 z-50 rounded-lg bg-white/20 text-white shadow-2xl backdrop-blur-sm motion-duration-700">
          <ul className="flex flex-col gap-2 divide-y divide-white/20 p-5">
            {/* <li>
              <Link href="/developer-about">Read Developer About</Link>
            </li> */}
            {themes.map((t, index) => (
              <li
                key={index}
                onClick={() => handleTheme(t)}
                className="hover:cursor-pointer"
              >
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        ref={iconRef}
        className={`${clicked ? "motion-preset-confetti motion-duration-2000" : "motion-preset-stretch"} fixed bottom-6 left-6 z-50 text-white hover:cursor-pointer hover:motion-rotate-in-[0.5turn]`}
        onClick={handleClick}
      >
        <GrSettingsOption className="text-3xl" />
      </div>
    </>
  );
};

export default Controls;
