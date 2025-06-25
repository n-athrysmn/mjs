"use client";

import ResultsPage from "@/components/Results";
import React, { useEffect, useState } from "react";

const LoveResultPage = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [random, setRandom] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("selectedCards");
    const someone = localStorage.getItem("random");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCards(parsed);
    }
    if (someone === "true") {
      setRandom(true);
    }
  }, []);

  const prompt = `Provide a personalized and insightful love tarot reading for each of the following cards individually, presented as a JSON array of objects. Each object should have two properties: 'card' (the name of the tarot card) and 'interpretation' (the reading for that specific card). Focus on interpreting their individual meaning for guidance, reflection, and potential future influences. Make each interpretation mystical and encouraging.
    Cards: ${cards.join(", ")}.`;

  const notRandom = `Provide a personalized and insightful love tarot reading for each of the following cards individually, presented as a JSON array of objects. Each object should have two properties: 'card' (the name of the tarot card) and 'interpretation' (the reading for that specific card). Focus on interpreting their individual meaning for guidance, reflection, and potential future influences. Make each interpretation mystical and encouraging.
    Mention these in the reading: my energy: ${cards[0]}, their energy: ${cards[1]}, the relationship: ${cards[2]}, the challenges/obstacles: ${cards[3]}, advice: ${cards[4]}, outcome: ${cards[5]}, longterm potential: ${cards[6]}.`;

  return (
    <div className="my-10 flex flex-col gap-5">
      <h3 className="text-center text-xl uppercase text-white">
        Your Love Reading Cards & Meanings
      </h3>
      <ResultsPage prompt={random ? prompt : notRandom} />
    </div>
  );
};

export default LoveResultPage;
