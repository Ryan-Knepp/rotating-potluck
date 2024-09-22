import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/complete")({
  loaderDeps: ({ search: { code } }) => ({
    code,
  }),
  loader: async ({ context: { auth }, params, location, deps: { code } }) => {
    if (auth) {
      await auth.authComplete(code);
    }
  },
  component: () => <Navigate to="/" />,
});
