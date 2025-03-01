import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CookingPot, PlusCircle } from "lucide-react";

export default function EmptyPotluckState() {
  return (
    <div className="w-full mx-auto">
      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-semibold text-center">
          No Active or Upcoming Potluck
        </h2>
        <div className="w-32 h-32 rounded-full flex items-center justify-center">
          <CookingPot className="w-16 h-16" />
        </div>
        <p className="text-center">
          Get started by creating a new potluck group.
        </p>
        <Button asChild className="mt-4">
          <Link to="/potlucks">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Potluck Group
          </Link>
        </Button>
      </div>
    </div>
  );
}
