

/**
 * Application routes configuration
 * Single source of truth for all route paths
 */

export const ROUTES = {
  // Public
  HOME: '/',
  
  // Authentication
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  
  // Expenses
  EXPENSES: '/expenses',
  EXPENSES_NEW: '/expenses/new',
  EXPENSES_DETAIL: (id: string) => `/expenses/${id}`,
  EXPENSES_EDIT: (id: string) => `/expenses/${id}/edit`,
  
  // Settings
  SETTINGS: '/settings',
  SETTINGS_PROFILE: '/settings/profile',
  SETTINGS_CATEGORIES: '/settings/categories',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
  
  // Profile
  PROFILE: '/profile',
} as const;

// Route groups
export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.EXPENSES,
  ROUTES.SETTINGS,
  ROUTES.PROFILE,
] as const;


export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}


export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
}

// Extract values
export const getAllAuthRoutes = () => AUTH_ROUTES;
export const getAllProtectedRoutes = () => PROTECTED_ROUTES;