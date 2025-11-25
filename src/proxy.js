import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

  const token = await request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
 
export const config = {
  matcher: ['/bookmarks/:path*', '/blog/:path*', '/profile/:path*', '/blog/:id*']
}


// import { NextResponse } from "next/server";

// export async function proxy(request) {
//   // Read token from cookie
//   // const token = request.cookies.get("token")?.value;

//   try {
//       const token = await request.cookies.get("token")?.value;

//     if (!token) {
//       // redirect to login if token missing
//       return NextResponse.redirect(new URL("/auth/login", request.url));
//     }
//   } catch(error){
//     throw new Error(error);
//   }


//   // Optional: you can add token verification later with Firebase Admin SDK
//   // but normally middleware just checks existence
// }

// export const config = {
//   matcher: ["/bookmarks/:path*", "/blog/:path*", "/profile/:path*", "/update-blog/:path*"],
// };
