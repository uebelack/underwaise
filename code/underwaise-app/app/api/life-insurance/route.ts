import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { email, name, birthDate, medicalConditions, hobbies } = body;

    if (!email || !name || !birthDate || !medicalConditions || !hobbies) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the data more thoroughly
    // 2. Save to database
    // 3. Send email notifications
    // 4. Integrate with your backend service

    console.log("Life Insurance Application Received:", {
      email,
      name,
      birthDate,
      medicalConditions,
      hobbies,
      timestamp: new Date().toISOString(),
    });

    // Simulate a successful response
    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId: `APP-${Date.now()}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing life insurance application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
