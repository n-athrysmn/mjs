"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Menus } from "@/common/interface";
import Link from "next/link";
import { IoIosArrowDropdownCircle } from "react-icons/io";

type MenuProps = {
  data: Menus[];
  sub?: boolean;
  setCard?: Dispatch<SetStateAction<string>>;
};

const Menu = ({ data, sub, setCard }: MenuProps) => {
  const topRow: Menus[][] = [];
  let chunkSize;

  if (data.length < 6 && data.length % 2 !== 0) {
    chunkSize = 3;
  } else {
    chunkSize = data.length % 2 !== 0 ? 4 : 3;
  }

  for (let i = 0; i < data.length; i += chunkSize) {
    topRow.push(data.slice(i, i + chunkSize));
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const renderByline = (items: Menus[][]) =>
    items.map((row, rowIndex) => (
      <ul
        key={rowIndex}
        className="flex flex-row items-center justify-center gap-5"
      >
        {row.map((item) => (
          <li
            key={item.label}
            className="flex h-80 w-64 cursor-pointer items-center justify-center rounded-md bg-cover bg-center text-white drop-shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:hover:text-[#ecc889]"
            style={{
              backgroundImage: `url(${item.bgImage || "/cards2.png"})`,
            }}
          >
            {sub && setCard ? (
              <button
                onClick={() => setCard(item.label)}
                className="flex h-80 w-64 flex-col items-center justify-center"
              >
                <h2
                  className={`text-lg uppercase md:text-2xl ${
                    item.bgImage ? "mt-40" : ""
                  }`}
                >
                  {item.label}
                </h2>
              </button>
            ) : (
              <Link
                href={item.href}
                className="flex h-80 w-64 flex-col items-center justify-center"
              >
                <h2
                  className={`text-lg uppercase md:text-2xl ${
                    item.bgImage ? "mt-40" : ""
                  }`}
                >
                  {item.label}
                </h2>
              </Link>
            )}
          </li>
        ))}
      </ul>
    ));

  const renderInline = (items: Menus[]) =>
    items.map((item) => (
      <li
        key={item.label}
        className="flex h-80 w-64 cursor-pointer items-center justify-center rounded-md bg-cover bg-center text-white drop-shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:hover:text-[#ecc889]"
        style={
          item.bgImage
            ? {
                backgroundImage: `url(${item.bgImage})`,
              }
            : {
                backgroundImage: `url('/cards2.png')`,
              }
        }
      >
        {sub && setCard ? (
          <button
            onClick={() => setCard(item.label)}
            className="flex h-80 w-64 flex-col items-center justify-center"
          >
            <h2
              className={`text-lg uppercase md:text-2xl ${
                item.bgImage ? "mt-40" : ""
              }`}
            >
              {item.label}
            </h2>
          </button>
        ) : (
          <Link
            href={item.href}
            className="flex h-80 w-64 flex-col items-center justify-center"
          >
            <h2
              className={`text-lg uppercase md:text-2xl ${
                item.bgImage ? "mt-40" : ""
              }`}
            >
              {item.label}
            </h2>
          </Link>
        )}
      </li>
    ));

  return (
    <>
      <div className="hidden w-full flex-col items-center justify-center gap-5 md:flex">
        {sub && (
          <span className="text-center text-xl text-white">
            Choose the number of cards you would like to pull
          </span>
        )}
        {data.length < 5 ? (
          <>
            <ul className="flex flex-row items-center justify-center gap-5">
              {renderInline(data)}
            </ul>
          </>
        ) : (
          renderByline(topRow)
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-5 md:hidden">
        {sub && (
          <span className="text-center text-sm text-white md:text-base">
            Choose the number of cards you would like to pull
          </span>
        )}
        <ul className="grid grid-cols-2 gap-3">
          {data.map((item) => (
            <li
              key={item.label}
              className="flex aspect-[4/5] h-48 w-full cursor-pointer items-center justify-center rounded-md bg-cover bg-center text-white drop-shadow-md transition-all duration-300 md:h-80 md:w-64 md:hover:-translate-y-1 md:hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
              style={
                item.bgImage
                  ? {
                      backgroundImage: `url(${item.bgImage})`,
                    }
                  : {
                      backgroundImage: `url('/cards2.png')`,
                    }
              }
            >
              {sub && setCard ? (
                <button
                  onClick={() => setCard(item.label)}
                  className="flex aspect-[4/5] h-48 flex-col items-center justify-center"
                >
                  <h2
                    className={`text-base uppercase md:text-2xl ${
                      item.bgImage ? "mt-40" : ""
                    }`}
                  >
                    {item.label}
                  </h2>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex aspect-[4/5] h-48 flex-col items-center justify-center"
                >
                  <h2
                    className={`text-base uppercase md:text-2xl ${
                      item.bgImage ? "mt-40" : ""
                    }`}
                  >
                    {item.label}
                  </h2>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {data.length > 5 && (
        <div
          className="fixed bottom-4 right-4 z-50 block animate-bounce text-white drop-shadow-md hover:cursor-pointer md:hidden"
          onClick={scrollToBottom}
        >
          <IoIosArrowDropdownCircle className="text-5xl" />
        </div>
      )}
    </>
  );
};

export default Menu;
