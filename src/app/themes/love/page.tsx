"use client";

import { ColorsType, Menus } from "@/common/interface";
import LeftRight from "@/components/LeftRight";
import Menu from "@/components/Menu";
import PickCard from "@/components/PickCard";
import ThemeTitle from "@/components/ThemeTitle";
import React, { useEffect, useState } from "react";
import { TbHeartQuestion } from "react-icons/tb";

const page = () => {
  const [done, setDone] = useState<boolean>(false);
  const [random, setRandom] = useState<boolean | null>(null);
  const [card, setCard] = useState<string>("");
  const [colors, setColors] = useState<ColorsType>({
    from: "slate-900",
    to: "gray-950",
  });

  const menuItems: Menus[] = [
    {
      label: "3",
      href: "/themes/love",
    },
    {
      label: "5",
      href: "/themes/love",
    },
    {
      label: "7",
      href: "/themes/love",
    },
  ];

  useEffect(() => {
    if (random !== null) {
      setDone((prev) => !prev);
    }
    if (random && random !== null) {
      localStorage.setItem("random", "true");
    } else {
      localStorage.setItem("random", "false");
    }
  }, [random]);

  useEffect(() => {
    const themeSaved = localStorage.getItem("theme");
    if (themeSaved) {
      const theme = JSON.parse(themeSaved);
      setColors(theme);
    }
  }, []);

  console.log(done);

  return (
    <>
      {card ? (
        <PickCard limit={card} path={"love"} themes={true} />
      ) : (
        <>
          {done ? (
            random ? (
              <div className="mb-10 mt-5 flex flex-col items-center justify-center gap-10 md:mb-20">
                <ThemeTitle
                  theme="Love"
                  Icon={TbHeartQuestion}
                  initialColors={colors}
                />
                <Menu data={menuItems} sub={true} setCard={setCard} />
              </div>
            ) : (
              <>
                <PickCard limit={"7"} path={"love"} themes={true} />
              </>
            )
          ) : (
            <div className="my-20 flex flex-col items-center justify-center gap-20 md:my-0 md:h-full">
              <h3 className="block text-center uppercase text-white md:hidden">
                Choose reading mode
              </h3>
              <LeftRight
                setLeft={setRandom}
                choices={["Random", "Have Someone"]}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default page;
