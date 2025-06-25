"use client";

import React, { useEffect, useState } from "react";
import { Tarot } from "./TarotData";
import { useRouter } from "next/navigation";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Loading from "../app/loading";
import { TarotCard } from "@/common/interface";

type PickCardProps = {
  limit: string;
  path: string;
  themes: boolean;
};

const PickCard = (props: PickCardProps) => {
  const { limit, path, themes } = props;
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const totalCards = 78;
  const remainingCards = totalCards - selectedCards.length;
  const cardsPerRow = 26;
  const overlapRem = 3;

  const remainingCardIndexes = Array.from(
    { length: remainingCards },
    (_, i) => i,
  );

  const rows = Array.from(
    { length: Math.ceil(remainingCards / cardsPerRow) },
    (_, rowIndex) =>
      remainingCardIndexes.slice(
        rowIndex * cardsPerRow,
        (rowIndex + 1) * cardsPerRow,
      ),
  );

  const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const remainingTarots = Tarot.filter(
    (card: TarotCard) => !selectedCards.includes(card.name),
  );

  const shuffledTarot = shuffleArray(remainingTarots);

  const handleCardSelect = (card: string) => {
    if (selectedCards.length < parseInt(limit, 10)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  useEffect(() => {
    if (selectedCards.length === parseInt(limit, 10)) {
      localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
      setLoading(true);
      if (themes) {
        navigate.push(`/themes/${path}/results`);
      } else {
        navigate.push(`/${path}/results`);
      }
    }
  }, [selectedCards, limit]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="mb-10 mt-5 flex flex-col items-center md:mb-20">
        <h3 className="text-base text-white md:text-lg">
          Select <b>{Number(limit) - selectedCards.length}</b>{" "}
          {Number(limit) < 2 && selectedCards.length < 1
            ? "card"
            : Number(limit) >= 2 && selectedCards.length < 1
              ? "cards"
              : Number(limit) - selectedCards.length < 2 &&
                  selectedCards.length > 0
                ? "more card"
                : "more cards"}
        </h3>
        <p className="block text-center text-sm text-white md:hidden">
          On every row of cards, scroll to the left for more cards
        </p>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="motion-preset-slide-right flex w-full justify-center overflow-x-auto"
            style={{
              animationDelay: `${(rowIndex + 4) * 100}ms`,
            }}
          >
            <div
              className="relative h-64"
              style={{ width: `${(cardsPerRow - 1) * overlapRem + 8}rem` }}
            >
              {row.map((cardIndex) => (
                <div
                  key={cardIndex}
                  onClick={() => {
                    handleCardSelect(shuffledTarot[cardIndex].name);
                  }}
                  className="absolute mt-10 h-48 w-32 cursor-pointer rounded border border-gray-300 bg-white bg-cover bg-center drop-shadow-2xl transition-transform duration-300 ease-in-out hover:z-50 hover:shadow-xl md:hover:-translate-y-3 md:hover:scale-105"
                  style={{
                    left: `${(cardIndex % cardsPerRow) * overlapRem}rem`,
                    zIndex: cardIndex % cardsPerRow,
                    backgroundImage: `url("/cards.png")`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        <div
          className="fixed bottom-4 right-4 z-50 block animate-bounce text-white hover:cursor-pointer 2xl:hidden"
          onClick={scrollToBottom}
        >
          <IoIosArrowDropdownCircle className="text-5xl" />
        </div>
      </div>
    </div>
  );
};

export default PickCard;
