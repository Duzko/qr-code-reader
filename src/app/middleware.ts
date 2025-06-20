import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/helpers/server/auth-utils";

export async function middleware(req: NextRequest) {
    const protectedPaths = ["/dashboard", "/profile"];
    const url = req.nextUrl.pathname;
    if (protectedPaths.some((path)=> url.startsWith(path))){
        const token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return verifyJwt(token)
    }
}


export const config = {
  matcher: ['/profile/:path*'],
};