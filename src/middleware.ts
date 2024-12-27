import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { parse } from "cookie"; // Correct import for the cookie package

function checkAuth(request: NextRequest) {
  const cookiesHeader = request.headers.get("cookie"); // Get the cookie header
  const cookies = cookiesHeader ? parse(cookiesHeader) : {}; // Use the named 'parse' function
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  const token = cookies.token || null;

  if (!user || !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// Middleware function that checks protected paths
export function middleware(request: NextRequest) {
  const protectedPaths = [
    "/dashboard",
    "/dashboard/add-company",
    "/dashboard/edit-company",
    "/dashboard/wishlist",
    "/dashboard/orders",
    "/dashboard/settings",
  ];

  if (protectedPaths.some((path) => request.url.includes(path))) {
    return checkAuth(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/add-company",
    "/dashboard/edit-company",
    "/dashboard/wishlist",
    "/dashboard/orders",
    "/dashboard/settings",
  ],
};
