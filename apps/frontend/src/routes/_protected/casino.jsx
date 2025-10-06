import {
  createFileRoute,
  MatchRoute,
  Navigate,
  Outlet,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/casino')({
  component: () => (
    <>
      <MatchRoute to="/casino">
        <Navigate to="/casino/home" />
      </MatchRoute>
      <Outlet />
    </>
  ),
});
