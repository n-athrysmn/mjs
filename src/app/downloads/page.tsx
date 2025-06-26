"use client";

import { ColorsType, Menus } from "@/common/interface";
import Menu from "@/components/Menu";
import ThemeTitle from "@/components/ThemeTitle";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaApple, FaDownload, FaLinux, FaWindows } from "react-icons/fa6";

const DownloadPage = () => {
  const [colors, setColors] = useState<ColorsType>({
    from: "slate-900",
    to: "gray-950",
  });

  useEffect(() => {
    const themeSaved = localStorage.getItem("theme");
    if (themeSaved) {
      const theme = JSON.parse(themeSaved);
      setColors(theme);
    }
  }, []);

  const menuItems: Menus[] = [
    {
      label: "Mac",
      href: "https://github.com/n-athrysmn/mjs/actions/runs/15893459823/artifacts/3407319980",
    },
    {
      label: "Linux",
      href: "https://github.com/n-athrysmn/mjs/actions/runs/15893459823/artifacts/3407324383",
    },
    {
      label: "Windows",
      href: "https://github.com/n-athrysmn/mjs/actions/runs/15893459823/artifacts/3407320269",
    },
  ];

  return (
    <div className="mb-10 mt-5 flex flex-col items-center justify-center gap-10 md:mb-20">
      <ThemeTitle theme="Download" Icon={FaDownload} initialColors={colors} />
      <div className="mt-10 flex flex-col gap-10 md:flex-row">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className="flex flex-col items-center justify-center">
              <div
                className='flex h-80 w-64 skew-x-3 cursor-pointer items-center justify-center rounded-md bg-[url("/cards2.png")] bg-cover bg-center p-2 text-white shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:hover:text-[#ecc889]'
                style={{
                  boxShadow: "0 4px 15px rgba(255, 255, 255, 0.6)",
                }}
              >
                {item.label.toLowerCase() === "mac" ? (
                  <FaApple className="text-6xl" />
                ) : item.label.toLowerCase() === "linux" ? (
                  <FaLinux className="text-6xl" />
                ) : (
                  <FaWindows className="text-6xl" />
                )}
              </div>
              <p className="mt-5 text-center font-bold uppercase tracking-widest text-white">
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DownloadPage;
