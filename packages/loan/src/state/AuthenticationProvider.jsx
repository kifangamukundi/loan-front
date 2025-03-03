'use client';
import { AuthProvider } from 'kifanga-ui-state';

export function AuthenticationProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
