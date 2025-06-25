"use client";

import { TarotCard } from "@/common/interface";
import ResultsPage from "@/components/Results";
import { Tarot } from "@/components/TarotData";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [randomCard, setRandomCard] = useState<TarotCard | null>(null);

  useEffect(() => {
    const card = Tarot[Math.floor(Math.random() * Tarot.length)];
    setRandomCard(card);
    localStorage.setItem("selectedCards", JSON.stringify(card.name));
  }, []);

  if (!randomCard) return null;

  console.log(randomCard);

  const prompt = `Provide a personalized and insightful tarot reading for the card ${randomCard.name}, as a JSON array of objects. Each object should have two properties: 'card' (the name of the tarot card) and 'interpretation' (the reading for that specific card). Focus on interpreting the meaning for guidance, reflection, and potential future influences. Make each interpretation mystical and encouraging.`;

  return (
    <>
      <h3 className='text-white text-xl uppercase m-10 text-center'>
        Your Daily Reading
      </h3>
      <ResultsPage prompt={prompt} />
    </>
  );
};

export default Page;
