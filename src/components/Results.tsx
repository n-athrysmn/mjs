"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Tarot } from "@/components/TarotData";
import { TarotCard } from "@/common/interface";
import { getAIReading } from "@/app/api";
import Loading from "../app/loading";
import { LiaPrayingHandsSolid } from "react-icons/lia";

interface ResultsPageProps {
  prompt: string;
}

interface CardReading {
  card: string;
  interpretation: string;
}

const ResultsPage = (data: ResultsPageProps) => {
  const { prompt } = data;
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [readings, setReadings] = useState<CardReading[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("selectedCards");
    if (stored) {
      const parsed = JSON.parse(stored);

      const filtered = Tarot.filter((item) => parsed.includes(item.name));
      setCards(filtered);
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      setLoading(true);
      const fetchFortuneTelling = async () => {
        const payload = {
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                card: { type: "STRING" },
                interpretation: { type: "STRING" },
              },
              propertyOrdering: ["card", "interpretation"],
            },
          },
        };
        try {
          const response = await getAIReading({ prompt, data: payload });

          setReadings(JSON.parse(response.data));
        } catch (error) {
          console.error("Error fetching fortune telling:", error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchFortuneTelling();
    }
  }, [cards.length, prompt]);

  function parseEmphasis(text: string) {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return <strong key={i}>{part.slice(1, -1).toUpperCase()}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  }

  useEffect(() => {
    if (readings.length > 0) {
      // localStorage.clear();
      localStorage.removeItem("selectedCards");
      localStorage.removeItem("question");
      localStorage.removeItem("random");
    }
  }, [readings]);

  return loading ? (
    <Loading />
  ) : (
    <div className="mb-10 flex flex-col items-center gap-10">
      {readings.length > 0 &&
        readings
          // .filter((reading) => reading.card !== "Conclusion")
          // .filter(
          //   (item, index, self) =>
          //     self.findIndex(
          //       (t) => t.card.toLowerCase() === item.card.toLowerCase(),
          //     ) === index,
          // )
          .filter((v, i, a) => a.indexOf(v) === i)
          .map((read, index) => {
            const card = cards.find(
              (c) => c.name === read.card.replace(/\s*\(.*?\)\s*/g, "").trim(),
            );
            const isFirstOccurrence =
              readings.findIndex(
                (item) => item.card.toLowerCase() === read.card.toLowerCase(),
              ) === index;

            return (
              <div
                key={`${read.card}-${index}`}
                className="flex h-full w-4/5 flex-col gap-5 rounded md:m-5 md:flex-row md:gap-20"
              >
                {/* Card Display */}
                {isFirstOccurrence &&
                  read.card.toLowerCase() !== "conclusion" && (
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className='flex h-80 w-64 skew-x-3 cursor-pointer items-center justify-center rounded-md bg-[url("/cards2.png")] bg-cover bg-center p-2 text-white shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] md:hover:text-[#ecc889]'
                        style={{
                          boxShadow: "0 4px 15px rgba(255, 255, 255, 0.6)",
                        }}
                      >
                        <Image
                          src={`/cards/${card?.img}`}
                          alt={read.card}
                          width={130}
                          height={100}
                        />
                      </div>
                      <p className="mt-5 text-center font-bold uppercase tracking-widest text-white">
                        {read.card}
                      </p>
                    </div>
                  )}

                {/* Interpretation Display */}
                <div
                  className={`w-full transform rounded-lg bg-gray-800/40 p-5 shadow-2xl ring-1 ring-white/10 drop-shadow-md backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] ${!isFirstOccurrence || read.card.toLowerCase() === "conclusion" ? "h-auto md:w-full" : "min-h-80 md:w-3/4"} md:p-10`}
                >
                  <h4
                    className={`font-bold text-white ${!isFirstOccurrence || read.card.toLowerCase() === "conclusion" ? "mb-2 flex" : "hidden"}`}
                  >
                    Conclusion:
                  </h4>
                  <p className="text-left text-base tracking-wide text-white">
                    {parseEmphasis(read.interpretation) ||
                      "No interpretation found."}
                  </p>
                </div>
              </div>
            );
          })}
      {error && (
        <div className="rounded-lg bg-gray-800/40 p-5">
          <p className="text-center text-lg font-bold text-red-600">
            Oops! There was an error when trying to fetch fortune telling from
            the AI, <br />
            please pick another card and try again ~ <br />{" "}
            <span className="text-sm">
              If you&apos;re still seeing this error after another attempt,
              please try again sometime. (Our AI might be busy{" "}
              <LiaPrayingHandsSolid />)
            </span>
          </p>
        </div>
      )}
      {readings.length < 1 && !error && (
        <p className="text-white">Nothing here ~</p>
      )}
    </div>
  );
};

export default ResultsPage;
