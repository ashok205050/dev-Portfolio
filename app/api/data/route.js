import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({
    success: true,
    message: 'Request successful',
    data: {
      message: 'Message and email sent successfully!',
    }
  }, { status: 200 });
};