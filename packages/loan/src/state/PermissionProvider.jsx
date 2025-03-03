'use client';
import { BASE_URL } from '@/helpers';
import { PermissionsProvider } from 'kifanga-ui-state';

export function PermissionProvider({ children }) {
  return <PermissionsProvider url={BASE_URL}>{children}</PermissionsProvider>;
}