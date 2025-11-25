import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

  // const token = request.cookies.get("token")?.value;
  const authId = request.headers.get("authorization");
  const token = authId?.split(" ")[1]; 

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/bookmarks/:path*', '/blog/:path*', '/profile/:path*', '/blog/:id*']
}