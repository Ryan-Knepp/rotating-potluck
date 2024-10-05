import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import Nav from "@/components/nav";
import NotFound from "@/components/not-found";

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
  notFoundComponent: () => <NotFound />,
});
