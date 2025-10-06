import './index.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import type { AuthState } from './features/auth/store/authStore';
import { useAuthStore } from './features/auth/store/authStore';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: false,
  context: {
    authStore: undefined,
  } as { authStore: AuthState | undefined },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App(): JSX.Element {
  const authStore = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider context={{ authStore }} router={router} />
    </QueryClientProvider>
  );
}

export default App;
