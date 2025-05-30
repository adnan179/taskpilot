import { createFileRoute, redirect } from '@tanstack/react-router';
import Home from '@/components/Home';

export const Route = createFileRoute('/home')({
  beforeLoad: async () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: '/home', // optional: to go back to home after login
        },
      });
    }
  },
  component: Home,
});
