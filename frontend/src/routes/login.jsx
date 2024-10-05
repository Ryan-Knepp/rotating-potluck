import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || "/dashboard" });
    }
  },
  component: Login,
});

function Login() {
  const { reason } = Route.useSearch();
  const auth = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{reason || "Welcome Back"}</CardTitle>
          <CardDescription>
            Log in with your Planning Center account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full bg-gradient-to-br from-purple-600 to-cyan-600"
            onClick={auth.login}
          >
            Log in with Planning Center
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
