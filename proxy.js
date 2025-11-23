import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  return NextResponse.redirect(new URL('/auth/login', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/about/:path*',],
}