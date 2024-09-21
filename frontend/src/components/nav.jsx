import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Nav() {
  const customStyle =
    "text-md md:text-lg rounded-md px-2 md:px-4 py-1 md:py-2 bg-purple-600 text-purple-50 transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-purple-700 hover:text-purple-50 data-[status=active]:bg-purple-700 focus:bg-purple-700 focus:text-purple-50 ring-offset-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2";

  return (
    <NavigationMenu className="max-w-full justify-between px-2 h-12 md:h-16 bg-purple-600">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={customStyle}>
            Home
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
      </NavigationMenuList>
      <NavigationMenuList className="justify-end">
        <NavigationMenuItem>
          <Button
            asChild
            className="h-8 md:h-10 px-2 md:px-4 py-1 md:py-2 bg-purple-700 hover:bg-purple-800 text-purple-50 hover:text-purple-50 texst-md md:text-lg font-semibold rounded-lg shadow-md"
          >
            <a href="/login" className="flex items-center justify-center">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </a>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
