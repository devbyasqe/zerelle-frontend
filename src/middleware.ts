import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type TToken = {
  role: "user" | "staff" | "superuser";
  username: string;
};

const roleRedirectMap: Record<TToken["role"], string> = {
  user: "/",
  staff: "/staff/dashboard",
  superuser: "/admin/dashboard",
};

const userUrls = ["/profile", "/cart", "/wishlist"];
const staffUrl = "/staff";
const superUserUrl = "/admin";

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access")?.value;
  const refreshToken = request.cookies.get("refresh")?.value;

  const isSecured =
    userUrls.some((url) => pathname.startsWith(url)) ||
    pathname.startsWith(staffUrl) ||
    pathname.startsWith(superUserUrl);

  if (!accessToken || !refreshToken) {
    if (isSecured) {
      return NextResponse.rewrite(new URL("/auth/sign-in", request.url));
    }
    return NextResponse.next();
  }
  try {
    const decodedAccess = jwtDecode<TToken>(accessToken);
    const decodedRefresh = jwtDecode<TToken>(refreshToken);

    if (decodedAccess.username !== decodedRefresh.username) {
      if (isSecured) {
        return NextResponse.rewrite(new URL("/auth/sign-in", request.url));
      }
      return NextResponse.next();
    }

    const userRole = decodedAccess.role;

    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(roleRedirectMap[userRole], request.url)
      );
    }

    if (pathname.startsWith(superUserUrl) && userRole !== "superuser") {
      return NextResponse.redirect(
        new URL(roleRedirectMap[userRole], request.url)
      );
    }

    if (pathname.startsWith(staffUrl) && userRole !== "staff") {
      return NextResponse.redirect(
        new URL(roleRedirectMap[userRole], request.url)
      );
    }

    if (
      userUrls.some((url) => pathname.startsWith(url)) &&
      userRole !== "user"
    ) {
      return NextResponse.redirect(
        new URL(roleRedirectMap[userRole], request.url)
      );
    }

    return NextResponse.next();
  } catch {
    if (isSecured) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    const response = NextResponse.next();
    response.cookies.delete("access");
    response.cookies.delete("refresh");
    return response;
  }
};

export default middleware;
