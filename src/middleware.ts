import { NextResponse, NextRequest } from 'next/server';

const privatePaths = ['/manage'];
const unAuthPaths = ['/login', '/register'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  console.log('accessToken__middleware', accessToken);

  if (privatePaths.some(path => pathname.startsWith(path)) && !accessToken) {
    const url = new URL('/login', request.url);

    return NextResponse.redirect(url);
  }
  if (accessToken) {
    // Nếu cố tình vào trang login sẽ redirect về trang chủ
    if (unAuthPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login'],
};
