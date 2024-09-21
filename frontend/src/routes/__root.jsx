import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Nav from "@/components/nav";
import NotFound from "@/components/not-found";

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
  notFoundComponent: () => <NotFound />,
});
