// lib/routes.ts
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/expenses',
  '/settings',
  '/profile',
] as const;

export const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
] as const;

export const PUBLIC_ROUTES = [
  '/',
] as const;

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

// export function isAuthRoute(pathname: string): boolean {
//   return AUTH_ROUTES.includes(pathname);
// }