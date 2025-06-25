"use client";

import ResultsPage from "@/components/Results";
import React, { useEffect, useState } from "react";

const page = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedCards");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCards(parsed);
    }
  }, []);

  const prompt = `Provide a personalized and insightful finance tarot reading for each of the following cards individually, presented as a JSON array of objects. Each object should have two properties: 'card' (the name of the tarot card) and 'interpretation' (the reading for that specific card). Focus on interpreting their individual meaning for guidance, reflection, and potential future influences. Make each interpretation mystical and encouraging.
    Cards: ${cards.join(", ")}.`;
  return (
    <div className="my-10 flex flex-col gap-5">
      <h3 className="text-center text-xl uppercase text-white">
        Your Finance Reading Cards & Meanings
      </h3>
      <ResultsPage prompt={prompt} />
    </div>
  );
};

export default page;
