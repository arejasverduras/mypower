/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthSession } from "../auth"; // Adjust the path if needed

export async function middleware(req: NextRequest) {
  const session = await getAuthSession(req as any, {} as any); // Force type match

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Protect specific routes
};