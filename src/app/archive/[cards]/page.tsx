"use client";

import { TarotCard } from "@/common/interface";
import { Tarot } from "@/components/TarotData";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

const page = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const card = pathSegments[pathSegments.length - 1] || "";

  const cardInfo: TarotCard[] = Tarot.filter(
    (info) =>
      info.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-") === card,
  );

  const title = card
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="mb-10 flex flex-col items-center gap-5">
      <h3 className="text-center text-xl uppercase text-white">
        {title} Tarot Card Meaning
      </h3>
      {cardInfo.map((item) => (
        <div
          key={item.name}
          className="flex h-full w-4/5 flex-col gap-5 rounded md:m-5 md:flex-row md:gap-20"
        >
          {/* Card Display */}
          <div className="flex flex-col items-center justify-center">
            <div
              className='flex h-80 w-64 skew-x-3 cursor-pointer items-center justify-center rounded-md bg-[url("/cards2.png")] bg-cover bg-center p-2 text-white shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:hover:text-[#ecc889]'
              style={{
                boxShadow: "0 4px 15px rgba(255, 255, 255, 0.6)",
              }}
            >
              <Image
                src={`/cards/${item?.img}`}
                alt={item.name}
                width={130}
                height={100}
              />
            </div>
            <p className="mt-5 text-center font-bold uppercase tracking-widest text-white">
              {item.name}
            </p>
          </div>
          {/* Interpretation Display */}
          <div
            className={`min-h-80 w-full transform rounded-lg bg-gray-800/40 p-5 shadow-2xl ring-1 ring-white/10 drop-shadow-md backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:w-3/4 md:p-10`}
          >
            <div className="flex flex-col gap-5">
              <p className="text-left text-base tracking-wide text-white">
                Arcana: {item.arcana}
              </p>
              {item.suit ? (
                <p className="text-left text-base tracking-wide text-white">
                  Suit: {item.suit}
                </p>
              ) : null}
              {item.elemental ? (
                <p className="text-left text-base tracking-wide text-white">
                  Element: {item.elemental}
                </p>
              ) : null}
              <div className="flex flex-col md:flex-row">
                <p className="mr-2 text-left text-base tracking-wide text-white">
                  Meaning (Upright):{" "}
                </p>
                <ul>
                  {item.meanings.light.map((up, index) => (
                    <li
                      key={index}
                      className="flex flex-row items-center gap-2"
                    >
                      <FaCaretRight className="text-white" />{" "}
                      <span className="text-white">{up}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="mr-2 text-left text-base tracking-wide text-white">
                  Meaning (Reversed):{" "}
                </p>
                <ul>
                  {item.meanings.shadow.map((rev, index) => (
                    <li
                      key={index}
                      className="flex flex-row items-center gap-2"
                    >
                      <FaCaretRight className="text-white" />{" "}
                      <span className="text-white">{rev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
