"use client";

import React, { Dispatch, SetStateAction } from "react";
import { GiArrowWings } from "react-icons/gi";

type LeftRightProps = {
  setLeft: Dispatch<SetStateAction<boolean | null>>;
  choices: string[];
};

const LeftRight = ({ choices, setLeft }: LeftRightProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-5 md:gap-20">
      <button
        className='flex aspect-[4/5] h-48 w-full skew-y-12 cursor-pointer items-center justify-center rounded-md bg-[url("/cards2.png")] bg-cover bg-center text-white transition-all duration-300 md:h-80 md:w-64 md:hover:-translate-y-1 md:hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
        onClick={() => setLeft(true)}
      >
        {choices[0]}
      </button>
      <div className="hidden flex-col items-center justify-center gap-10 md:flex">
        <p className="text-center uppercase text-white">Choose reading mode</p>
        <div className="flex animate-pulse items-center justify-center text-white">
          <GiArrowWings className="animate-tick text-center text-9xl text-white" />
        </div>
      </div>

      <button
        className='flex aspect-[4/5] h-48 w-full -skew-y-12 cursor-pointer items-center justify-center rounded-md bg-[url("/cards2.png")] bg-cover bg-center text-white transition-all duration-300 md:h-80 md:w-64 md:hover:-translate-y-1 md:hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
        onClick={() => setLeft(false)}
      >
        {choices[1]}
      </button>
    </div>
  );
};

export default LeftRight;
