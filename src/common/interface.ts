"use client";

export type Menus = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  bgImage?: string;
};

export interface TarotCard {
  name: string;
  number: string;
  arcana: string;
  suit: string;
  img: string;
  fortune_telling: string[];
  keywords: string[];
  meanings: {
    light: string[];
    shadow: string[];
  };
  archetype?: string;
  hebrew_alphabet?: string;
  numerology?: string;
  astrology?: string;
  elemental?: string;
  affirmation?: string;
  mythical_spiritual?: string;
  questions: string[];
}

export interface History {
  role: string;
  parts: { text: string }[];
}

export interface AIReadingProps {
  prompt?: string;
  data: {
    responseSchema: {
      type: string;
      items: {
        type: string;
        properties: object;
      };
      propertyOrdering?: string[];
    };
  };
  instruction?: string;
  llmHistory?: History[];
}

export type ColorsType = {
  label?: string;
  from: string;
  via?: string;
  to: string;
};
