import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sempre libera caminhos públicos e assets
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();

  // Checa se existe cookie de sessão do Supabase
  const hasSession = request.cookies.getAll().some(
    (c) => c.name.includes('auth-token') && c.value
  );

  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.json|api/).*)'],
};
