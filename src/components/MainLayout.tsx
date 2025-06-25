"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Nav from "./Nav";
import Door from "./Door";
import Controls from "./Controls";
import { ColorsType } from "@/common/interface";
import Stars from "./Stars";
import { usePathname } from "next/navigation";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [welcomed, setWelcomed] = useState<boolean>(false);
  const [checkedStorage, setCheckedStorage] = useState<boolean>(false);
  const [colors, setColors] = useState<ColorsType>({
    from: "slate-900",
    via: "neutral-900",
    to: "gray-950",
  });
  const pathname = usePathname();

  useEffect(() => {
    const welcomeValue = localStorage.getItem("welcome");
    if (welcomeValue === "true") {
      setWelcomed(true);
    }
    setCheckedStorage(true);
  }, []);

  if (!checkedStorage) return null;

  console.log(colors);

  return (
    <>
      {welcomed ? (
        <div
          className={`relative z-10 flex h-screen animate-gradient flex-col bg-transparent bg-gradient-to-r from-${colors.from} via-${colors.via} to-${colors.to} overflow-auto bg-[length:400%_400%]`}
        >
          <Stars />
          <Nav />
          <main className="mx-5 flex-1 md:mx-10">{children}</main>
          {pathname === "/" && <Controls setTheme={setColors} />}
        </div>
      ) : (
        <Door setOpen={setWelcomed} />
      )}
    </>
  );
};

export default MainLayout;
