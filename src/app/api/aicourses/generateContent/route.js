import connectDb from "../../../../../backend/middleware/db";
import { NextResponse } from "next/server";

const generateCourseMaterial = async (request,{params}) => {

  try {
    const { prompt, model = "gpt-3.5-turbo", temperature = 0.7 } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    const message = data.choices[0].message.content;

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from OpenAI API", details: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(generateCourseMaterial);
