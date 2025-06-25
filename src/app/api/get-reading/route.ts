import { AIReadingProps } from "@/common/interface";
import { GEMINI_API_KEY, GEMINI_API_URL } from "@/helpers/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: AIReadingProps = await req.json();
  const apiKey = GEMINI_API_KEY;
  const apiUrl = GEMINI_API_URL;
  let chatHistory = [];
  let schema = {};
  let instruction = "";

  if (data.prompt && !data.llmHistory) {
    chatHistory = [
      {
        role: "user",
        parts: [{ text: data.prompt }],
      },
    ];
  } else if (data.llmHistory && data.llmHistory.length > 0) {
    chatHistory = data.llmHistory;
  } else {
    chatHistory = [
      {
        role: "user",
        parts: [{ text: "Whats the meaning of life" }],
      },
    ];
  }

  if (data.data && data.data.responseSchema) {
    schema = data.data.responseSchema;
  } else {
    schema = {
      type: "STRING",
    };
  }

  if (data && data.instruction) {
    instruction = data.instruction;
  } else {
    instruction =
      "Provide a personalized and insightful tarot reading for the question. Focus on interpreting the meaning for guidance, reflection, and potential future influences. Make it mystical and encouraging. If tarot cards interpretation are available, always include conclusion and put it as a separate JSON object. If it's not related to the previous conversation or tarot/mystical reading, always answer with 'I am not sure about that, but I will try to find out.'";
  }

  const payload = {
    contents: chatHistory,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
    systemInstruction: {
      parts: [
        {
          text: instruction,
        },
      ],
    },
  };

  if (!apiKey || !apiUrl) {
    return NextResponse.json(
      { error: "API key or URL is not set in environment variables." },
      { status: 500 },
    );
  }

  try {
    console.dir(payload, { depth: null });

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const data = result.candidates[0].content.parts[0].text;
      return NextResponse.json({ data: data, code: 200 }, { status: 200 });
    } else {
      console.error("Unexpected AI response structure:", result);
    }
  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Gemini API." },
      { status: 500 },
    );
  }
}
