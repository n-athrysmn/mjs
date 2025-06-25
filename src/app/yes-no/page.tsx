"use client";

import PickCard from "@/components/PickCard";
import React, { useEffect, useMemo, useState } from "react";

const YesNoPage = () => {
  const [question, setQuestion] = useState<string>("");
  const [card, setCard] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("question", question);
  }, [question]);

  const placeholders = [
    "Ask me something...",
    "Ready when you are...",
    "Type your question here...",
    "Need to know if it's a 'yes' or a 'no'? Just ask!",
    "What's on your mind?",
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const placeholder = useMemo(() => {
    const index = Math.floor(Math.random() * placeholders.length);
    return placeholders[index];
  }, []);

  return (
    <>
      {card ? (
        <PickCard limit={card} path={"yes-no"} themes={false} />
      ) : (
        <div className="justify-content my-20 flex flex-col items-center gap-5 md:my-10">
          <h3 className="text-lg uppercase text-white md:text-xl">
            Is it a <b>YES</b> or a <b>NO</b>?
          </h3>
          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:gap-10 md:p-10">
            <input
              placeholder={placeholder}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              className="min-h-80 w-full transform rounded-lg bg-gray-800/25 p-10 text-lg text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-sm transition md:w-3/4 md:text-2xl"
            />
            <button
              onClick={() => setCard("1")}
              className="flex h-24 w-full transform flex-col items-center justify-center rounded-lg bg-gray-800/25 p-10 text-center uppercase text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:h-40 md:w-1/4"
            >
              Pick a Card
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default YesNoPage;
