import { createFileRoute, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { getAuthState } from '@/features/auth/store/authStore';
import { getUserDetails } from '@/api/auth';
import { Header } from '@/components/Header';

export const Route = createFileRoute('/_protected')({
  async beforeLoad({ context }) {
    const { user, showLoginModal } = getAuthState();

    if (!user) {
      try {
        // Fetch user details if not already authenticated
        const queryClient = new QueryClient();
        const res = await queryClient.fetchQuery({
          queryKey: ['me'],
          queryFn: getUserDetails,
          retry: false,
        });
        // Set user in auth store if fetch succeeds
        context.authStore?.setUser(res.data);
      } catch (error) {
        // Instead of redirecting, show login modal
        showLoginModal();
      }
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout(): JSX.Element {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
