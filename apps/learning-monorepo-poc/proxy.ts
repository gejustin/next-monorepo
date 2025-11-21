import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_LOCALE = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the path starts with /en/projects, redirect to /projects (remove locale)
  if (pathname.startsWith(`/${DEFAULT_LOCALE}/projects`)) {
    const newPathname = pathname.replace(`/${DEFAULT_LOCALE}`, '');
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // If the path starts with /projects (without locale), rewrite to /en/projects internally
  if (pathname.startsWith('/projects') && !pathname.startsWith(`/${DEFAULT_LOCALE}/projects`)) {
    const newPathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.rewrite(new URL(newPathname, request.url));
  }

  // If the path starts with /en (but not /en/projects), redirect to remove /en
  if (pathname.startsWith(`/${DEFAULT_LOCALE}/`) && !pathname.startsWith(`/${DEFAULT_LOCALE}/projects`)) {
    const newPathname = pathname.replace(`/${DEFAULT_LOCALE}`, '') || '/';
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

