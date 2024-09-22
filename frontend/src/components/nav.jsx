import { useCallback } from "react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/use-auth";

export default function Nav() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleAuthButtonClick = async () => {
    if (auth.isAuthenticated) {
      await auth.logout();
      setTimeout(() => navigate({ to: "/" }), 100);
    } else {
      auth.login();
    }
  };

  const customStyle =
    "text-md md:text-lg rounded-md px-2 md:px-4 py-1 md:py-2 bg-purple-600 text-purple-50 transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-purple-700 hover:text-purple-50 data-[status=active]:bg-purple-700 focus:bg-purple-700 focus:text-purple-50 ring-offset-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2";

  return (
    <NavigationMenu className="max-w-full justify-between px-2 h-12 md:h-16 bg-purple-600">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="text-purple-50">
            <UtensilsCrossed className="h-6 w-6 mx-2 md:ml-4" />
            <span className="sr-only">Church Potluck Organizer</span>
          </Link>
        </NavigationMenuItem>
        {auth.isAuthenticated && (
          <>
            <NavigationMenuItem>
              <Link to="/dashboard" className={customStyle}>
                Dashboard
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/potlucks" className={customStyle}>
                Potlucks
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/people" className={customStyle}>
                People
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
      <NavigationMenuList className="justify-end">
        <NavigationMenuItem>
          <Button className={customStyle} onClick={handleAuthButtonClick}>
            {auth.isAuthenticated ? "Log out" : "Log in"}
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
