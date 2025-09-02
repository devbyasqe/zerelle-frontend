import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type TToken = {
  exp: number;
  role: string;
  username: string;
};

const middleware = (request: NextRequest) => {
  const accessToken = request.cookies.get("access")?.value;
  const refreshToken = request.cookies.get("refresh")?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.next();
  }

  try {
    const decodedAccess = jwtDecode<TToken>(accessToken);
    const decodedRefresh = jwtDecode<TToken>(refreshToken);

    const isValidUser = decodedAccess.username === decodedRefresh.username;

    if (isValidUser && request.nextUrl.pathname.startsWith("/auth")) {
      let redirectUrl = "/";
      if (decodedAccess.role === "superuser") redirectUrl = "/admin";
      else if (decodedAccess.role === "staff") redirectUrl = "/staff";

      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  } catch {
    const response = NextResponse.next();
    response.cookies.delete("access");
    response.cookies.delete("refresh");
    return response;
  }

  return NextResponse.next();
};

export default middleware;
