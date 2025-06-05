import { createFileRoute, redirect } from '@tanstack/react-router';
import Dashboard from '@/pages/Dashboard';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      throw redirect({
        to: '/signin',
        search: {
          redirect: '/dashboard',
        },
      });
    }
  },
  component: Dashboard,
});
