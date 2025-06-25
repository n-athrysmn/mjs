"use client";

import ExplainCards from "@/components/ExplainCards";
import React from "react";

const page = () => {
  const prompt = `Help me explain the cards I pulled for daily guidance.`;

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center text-xl uppercase text-white">
        Your Daily Reading Cards & Meanings
      </h3>
      <ExplainCards prompt={prompt} />
    </div>
  );
};

export default page;
