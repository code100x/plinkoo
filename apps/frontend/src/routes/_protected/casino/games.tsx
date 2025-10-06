import {
  createFileRoute,
  MatchRoute,
  Navigate,
  Outlet,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/casino/games')({
  component: () => (
    <>
      <MatchRoute to="/casino/games">
        <Navigate to="/casino/home" />,
      </MatchRoute>
      <div className="container mt-4 lg:mt-12 px-0">
        <Outlet />
      </div>
    </>
  ),
});
