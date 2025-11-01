import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const SECRET_KEY = process.env.RECAPTCHA_SECRETKEY;

  try {
    const { recaptchaResponse } = await request.json();

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaResponse}`;

    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaJson = await recaptchaRes.json();

    return NextResponse.json({ ...recaptchaJson });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 400 }
    );
  }
}
