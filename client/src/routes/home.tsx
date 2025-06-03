import { createFileRoute, redirect } from '@tanstack/react-router';
import Dashboard from '@/pages/Dashboard';

export const Route = createFileRoute('/home')({
  beforeLoad: async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      throw redirect({
        to: '/siginin',
        search: {
          redirect: '/home', // optional: to go back to home after login
        },
      });
    }
  },
  component: Dashboard,
});
