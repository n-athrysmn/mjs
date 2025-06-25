"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Stars from "./Stars";
import Image from "next/image";

type DoorProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const Door = ({ setOpen }: DoorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    setOpen(true);
    localStorage.setItem("welcome", "true");
  };

  return (
    <div className="relative h-screen w-screen">
      <Stars />

      <div className="flex h-full flex-row">
        <div className="w-1/2 bg-gray-950" />
        <div className="w-1/2 bg-gray-950" />
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-10">
        <div className="flex flex-col items-center justify-center gap-10">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md"
          />
          <h1 className="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md text-center text-2xl uppercase text-white">
            <span className="opacity-70">Welcome to</span> MJAYNSurreptitious
          </h1>
        </div>
        <button
          className="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md w-auto max-w-xs rounded bg-gray-800/40 p-5 text-white"
          onClick={toggle}
        >
          Click to start
        </button>
      </div>
    </div>
  );
};

export default Door;
