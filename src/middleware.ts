import { NextResponse, NextRequest } from 'next/server';

const privatePaths = ['/campaigns'];
const unAuthPaths = ['/login', '/register'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  console.log('accessToken__middleware', accessToken);

  if (privatePaths.some(path => pathname.startsWith(path))) {
    if (!accessToken) {
      const url = new URL('/login', request.url);

      return NextResponse.redirect(url);
    } else {
      const requestHeaders = new Headers(request.headers);

      requestHeaders.set('x-return-to', pathname + search);
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    }
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
  matcher: ['/login', '/campaigns'],
};
