"use client";

import ResultsPage from "@/components/Results";
import React, { useEffect, useState } from "react";

const page = () => {
  const [cards, setCards] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("selectedCards");
    const question = localStorage.getItem("question");
    if (stored && question) {
      const parsed = JSON.parse(stored);
      setCards(parsed[0]);
      setQuestion(question);
    }
  }, []);

  const prompt = `Provide a personalized and insightful tarot reading for the question: ${question} with the card ${cards}, presented as a JSON array of objects. Each object should have two properties: 'card' (the name of the tarot card) and 'interpretation' (the reading for that specific card). Focus on interpreting their individual meaning for guidance, reflection, and potential future influences. Make each interpretation mystical and encouraging.`;

  return (
    <div className="flex flex-col items-center">
      <div className="m-10 flex w-4/5 transform flex-col items-center justify-center gap-5 rounded-lg bg-gray-800/25 p-5 text-center text-lg uppercase tracking-widest text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:text-xl">
        <h3>Your Reading Cards & Meanings for Question: </h3>
        <span className="font-bold">{question}</span>
      </div>
      <ResultsPage prompt={prompt} />
    </div>
  );
};

export default page;
