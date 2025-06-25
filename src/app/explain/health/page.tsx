"use client";

import ExplainCards from "@/components/ExplainCards";
import React from "react";

const page = () => {
  const prompt = `Help me explain the cards I pulled for body/mental health guidance.`;

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center text-xl uppercase text-white">
        Your body/mental health Reading Cards & Meanings
      </h3>
      <ExplainCards prompt={prompt} />
    </div>
  );
};

export default page;
