"use client";

import { getAIReading } from "@/app/api";
import React, { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

type AICards = {
  name: string;
  interpretation: string;
};

interface History {
  sender: "user" | "model";
  content: string;
}

interface Message extends History {
  cards?: AICards[];
}

type ExplainCardsProps = {
  prompt: string;
};

const ExplainCards = ({ prompt }: ExplainCardsProps) => {
  const [history, setHistory] = useState<History[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const handleUserMessage = async (content: string) => {
    const userMessage: Message = { sender: "user", content: content };
    setMessages((prev) => [...prev, userMessage]);
    setHistory((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const chatHistoryForLLM = [
      ...messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      { role: "user", parts: [{ text: content }] },
    ];

    console.log("llm:", chatHistoryForLLM);

    const payload = {
      responseSchema: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            reply: {
              type: "OBJECT",
              properties: {
                message: { type: "STRING" },
                cards: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      name: { type: "STRING" },
                      interpretation: { type: "STRING" },
                    },
                    propertyOrdering: ["name", "interpretation"],
                  },
                },
              },
              propertyOrdering: ["message", "cards"],
            },
          },
          propertyOrdering: ["reply"],
        },
      },
    };
    try {
      const res = await getAIReading({
        data: payload,
        llmHistory: chatHistoryForLLM,
      });

      const data = JSON.parse(res.data);
      console.log("raw: ", data);
      const { message, cards } = data[0].reply;
      console.log("AI Response Data:", data[0].reply);
      console.log("AI Response Message:", cards);

      let aiMessage: Message = { sender: "model", content: "" };
      let aiHistory: History = { sender: "model", content: "" };
      let combinedString = "";

      if (!cards) {
        aiMessage = { sender: "model", content: message };
        aiHistory = { sender: "model", content: message };
      } else {
        aiMessage = { sender: "model", content: message, cards: cards };
        combinedString = [
          message,
          ...cards.map((card: any) => `${card.name}: ${card.interpretation}`),
        ].join(" ");
        aiHistory = { sender: "model", content: combinedString };
      }

      setMessages((prev) => [...prev, aiMessage]);
      setHistory((prev) => [...prev, aiHistory]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "model", content: "Error retrieving response." },
      ]);
    }
    setDisable(false);
    setLoading(false);
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setDisable(true);

    await handleUserMessage(input);
    setInput("");
  };

  console.log(prompt);

  const promptSentRef = useRef(false);

  useEffect(() => {
    if (prompt && !promptSentRef.current) {
      promptSentRef.current = true;
      handleUserMessage(prompt);
      setLoading(true);
      setDisable(true);
    }
  }, [prompt]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      const element = messagesEndRef.current as HTMLDivElement;
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleReset = () => {
    setMessages([]);
    setHistory([]);
  };

  function parseEmphasis(rawText: string) {
    const text = rawText.replace(/^\*\s*(?=\*\*)/gm, "");

    const parts = text.split(/(\*\*[^\*]+\*\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <Fragment key={i}>
            <br />
            <br />
            <strong>{boldText}</strong>
          </Fragment>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <div className="justify-content mb-10 flex h-[70vh] flex-col items-center gap-5 md:m-10">
      <div className="flex w-full flex-col justify-center gap-5">
        <div className="relative h-[50vh] w-full overflow-y-auto rounded-lg bg-gray-950/25 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm">
          {history.length > 1 && (
            <div className="sticky top-0 z-10 flex justify-end px-2 py-2">
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          )}
          <div className="px-5 pb-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 text-sm md:text-base ${
                  msg.sender === "user"
                    ? "ml-auto self-end rounded-bl-lg rounded-tl-lg rounded-tr-lg bg-blue-500 text-white"
                    : "rmr-auto w-full self-start rounded-br-lg rounded-tl-lg rounded-tr-lg bg-gray-700 text-white"
                }`}
              >
                {msg.sender === "model" && msg.cards && msg.cards.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-white">{parseEmphasis(msg.content)}</p>
                    <div className="space-y-2">
                      {msg.cards.map((card, j) => (
                        <div
                          key={j}
                          className="border-l-4 border-blue-400 pl-3"
                        >
                          <p className="font-semibold text-blue-200">
                            {card.name}
                          </p>
                          <p className="text-gray-200">{card.interpretation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-white">{parseEmphasis(msg.content)}</p>
                )}
              </div>
            ))}
            {loading && <div className="text-gray-400">AI is thinking...</div>}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="flex gap-2 md:gap-4">
          <input
            name="userMsg"
            id="userMsg"
            disabled={disable}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow rounded-lg bg-gray-800/25 p-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-sm"
            placeholder="Type your question..."
          />
          <button
            type="submit"
            className="hidden rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 md:block"
          >
            Send
          </button>
          <button className="block rounded-full bg-blue-600 px-5 md:hidden">
            <IoSend className="text-center text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExplainCards;
