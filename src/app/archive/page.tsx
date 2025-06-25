"use client";

import { Menus, TarotCard } from "@/common/interface";
import { Tarot } from "@/components/TarotData";
import Link from "next/link";
import React from "react";

const page = () => {
  const major: TarotCard[] = Tarot.filter(
    (card) => card.arcana === "Major Arcana",
  );
  const cups: TarotCard[] = Tarot.filter((card) => card.suit === "Cups");
  const wands: TarotCard[] = Tarot.filter((card) => card.suit === "Wands");
  const swords: TarotCard[] = Tarot.filter((card) => card.suit === "Swords");
  const coins: TarotCard[] = Tarot.filter((card) => card.suit === "Pentacles");

  const rows = chunkCards(major, 6);
  const cupsRows = chunkCards(cups, 7);
  const wandsRows = chunkCards(wands, 7);
  const swordsRows = chunkCards(swords, 7);
  const coinsRows = chunkCards(coins, 7);
  const mobRows = chunkCards(major, 2);
  const mobCupsRows = chunkCards(cups, 2);
  const mobWandsRows = chunkCards(wands, 2);
  const mobSwordsRows = chunkCards(swords, 2);
  const mobCoinsRows = chunkCards(coins, 2);

  const suits = {
    major,
    cups,
    wands,
    swords,
    coins,
  };

  function chunkCards(cards: TarotCard[], size: number): TarotCard[][] {
    const chunks: TarotCard[][] = [];
    for (let i = 0; i < cards.length; i += size) {
      chunks.push(cards.slice(i, i + size));
    }
    return chunks;
  }

  function formatCardName(cardName: string): string {
    return cardName.toLowerCase().replace(/\s+/g, "-");
  }

  const renderByline = (items: TarotCard[][]) =>
    items.map((row, rowIndex) => (
      <ul
        key={rowIndex}
        className="flex flex-row items-center justify-center gap-5"
      >
        {row.map((item) => (
          <li
            key={item.name}
            className="flex h-40 w-24 cursor-pointer items-center justify-center rounded-md bg-cover bg-center text-white drop-shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:hover:text-[#ecc889]"
            style={{
              backgroundImage: `url(/cards/${item.img})`,
            }}
          >
            <Link
              href={`/archive/${formatCardName(item.name)}`}
              className="flex h-40 w-24 flex-col items-center justify-center bg-gray-800/70 text-center"
            >
              <h2 className={`text-xs font-bold uppercase tracking-widest`}>
                {item.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    ));

  return (
    <div className="mb-20 flex flex-col items-center justify-center gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 rounded-lg bg-gray-800/40 p-5 shadow-2xl">
        <h3 className="uppercase text-white">MAJOR ARCHANA</h3>
        <p className="text-white">
          A powerful and mystical set of 22 cards found in Tarot decks. These
          cards represent the archetypal energies and profound spiritual lessons
          that encompass the human journey. Each card holds a unique symbolism
          and narrative, reflecting the stages, challenges, and transformations
          encountered in life. From the Fool to the World, the Major Arcana
          takes the reader on a profound voyage of self-discovery and growth.
        </p>
        <div className="hidden flex-col gap-10 md:flex">
          {renderByline(rows)}
        </div>
        <div className="flex flex-col gap-10 md:hidden">
          {renderByline(mobRows)}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-10 rounded-lg bg-gray-800/40 p-5 shadow-2xl">
        <h3 className="uppercase text-white">MINOR ARCHANA</h3>
        <p className="text-white">
          These 56 cards refer to things and influences in your life on a day to
          day basis. Simply put, they determine what’s going on in your life
          right now. This means their influence can be easily changed based on
          the actions you take. Having a deeper insight into what you’re going
          through at the moment can push you in the right direction. You’ll know
          precisely what to do or what steps to make in order to reach your long
          term goals. From this point of view, Minor Arcana cards can showcase a
          current situation, problem, or element in your life, meaning they make
          a good choice for daily readings.
        </p>
        <div className="flex flex-col gap-5">
          <h3 className="uppercase text-white">CUPS</h3>
          <p className="text-white">
            Delves into the emotional and spiritual dimensions of life,
            encompassing feelings, relationships, and inner experiences.
            Associated with the element of water, Cups symbolize love,
            intuition, and the fluidity of emotions. This suit speaks to the
            heart, reflecting the joys and sorrows that come with human
            connections and the pursuit of emotional fulfillment. Cups guide us
            through the ebb and flow of our inner world, encouraging empathy,
            compassion, and the nurturing of our deepest desires.
          </p>
          <div className="hidden flex-col gap-10 md:flex">
            {renderByline(cupsRows)}
          </div>
          <div className="flex flex-col gap-10 md:hidden">
            {renderByline(mobCupsRows)}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="uppercase text-white">PENTACLES</h3>
          <p className="text-white">
            Grounded in the material and physical aspects of life, representing
            prosperity, stability, and the tangible outcomes of our efforts.
            Connected to the element of earth, Pentacles symbolize wealth,
            health, and the practical matters that sustain us. This suit focuses
            on the fruits of labor, the value of hard work, and the importance
            of nurturing our resources. Pentacles guide us to build a solid
            foundation, emphasizing the need for balance and responsibility in
            managing our material world.
          </p>
          <div className="hidden flex-col gap-10 md:flex">
            {renderByline(coinsRows)}
          </div>
          <div className="flex flex-col gap-10 md:hidden">
            {renderByline(mobCoinsRows)}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="uppercase text-white">SWORDS</h3>
          <p className="text-white">
            Cuts through the complexities of the mind, representing intellect,
            clarity, and the challenges of decision-making. Aligned with the
            element of air, Swords symbolize thoughts, communication, and the
            power of truth. This suit often deals with conflict, struggle, and
            the harsh realities we must face, urging us to confront our fears
            and think critically. Swords are the cards of mental clarity and
            fortitude, guiding us to wield our intellect with precision and to
            navigate the trials of life with honesty and courage.
          </p>
          <div className="hidden flex-col gap-10 md:flex">
            {renderByline(swordsRows)}
          </div>
          <div className="flex flex-col gap-10 md:hidden">
            {renderByline(mobSwordsRows)}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="uppercase text-white">WANDS</h3>
          <p className="text-white">
            A vibrant and energetic force within the Tarot, representing
            creativity, ambition, and the pursuit of goals. It is associated
            with the element of fire, symbolizing passion, inspiration, and the
            drive to take action. Wands are the cards of enterprise and growth,
            often indicating the beginning of a new project or the push needed
            to turn ideas into reality. This suit guides us through the realm of
            desires, urging us to follow our intuition and take bold steps
            toward our aspirations.
          </p>
          <div className="hidden flex-col gap-10 md:flex">
            {renderByline(wandsRows)}
          </div>
          <div className="flex flex-col gap-10 md:hidden">
            {renderByline(mobWandsRows)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
