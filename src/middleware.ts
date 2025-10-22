import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: Middleware is currently disabled to avoid client-side auth conflicts
// Auth protection is handled by ProtectedRoute component and useEffect checks

export function middleware(request: NextRequest) {
  // Simply pass through all requests
  // Auth is handled on client-side with ProtectedRoute component
  return NextResponse.next();
}

// Only run middleware for API routes if needed in the future
export const config = {
  matcher: [
    // Disabled for now - auth handled client-side
    // Will implement proper cookie-based auth in future optimization
  ],
};
