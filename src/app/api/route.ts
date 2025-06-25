import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message:
        "Welcome to mjaynsurreptitious! This endpoint only accepts POST requests.",
      hint: "Use fetch or Postman to send a POST request.",
    },
    { status: 200 },
  );
}
