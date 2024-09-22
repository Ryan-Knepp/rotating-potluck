import { createFileRoute, Link } from "@tanstack/react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  UsersIcon,
  HomeIcon,
  UserIcon,
  PlusCircleIcon,
  UserPlusIcon,
} from "lucide-react";

import { useSuspenseQuery } from "@tanstack/react-query";
import PotluckIterationList from "@/components/dashboard/potluck-iteration-list";
import { splitDateRange } from "@/lib/utils";
import { isPast, isToday, isFuture } from "date-fns";

const fetchAttendees = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/attendees`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch attendees");
  }

  return await response.json();
};

const attendeesQueryOptions = {
  queryKey: ["attendees"],
  queryFn: () => fetchAttendees(),
};

const fetchPotluckIterations = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/potluck_iterations`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch potluck iterations");
  }

  return await response.json();
};

const potluckIterationsQueryOptions = {
  queryKey: ["potluck-iterations"],
  queryFn: () => fetchPotluckIterations(),
};

const getActivePotluckIterations = (potluckIterations) => {
  return potluckIterations.filter((iteration) => {
    const [from, to] = splitDateRange(iteration.date_range);
    return (isPast(from) || isToday(from)) && (isFuture(to) || isToday(to));
  });
};

export const Route = createFileRoute("/_auth/dashboard")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(attendeesQueryOptions);
    queryClient.ensureQueryData(potluckIterationsQueryOptions);
  },
  component: RotatingPotluckDashboard,
});

export default function RotatingPotluckDashboard() {
  const attendeesQuery = useSuspenseQuery(attendeesQueryOptions);
  const attendees = attendeesQuery.data;

  const potluckIterationsQuery = useSuspenseQuery(
    potluckIterationsQueryOptions
  );
  const potluckIterations = potluckIterationsQuery.data;

  const activePotluckIterations = getActivePotluckIterations(potluckIterations);

  const upcomingPotluckIterations = potluckIterations.filter((iteration) => {
    const [from, to] = splitDateRange(iteration.date_range);
    return isFuture(from);
  });

  const pastPotluckIterations = potluckIterations.filter((iteration) => {
    const [from, to] = splitDateRange(iteration.date_range);
    return isPast(to);
  });

  const totalAttendees =
    (attendees.households?.reduce((total, household) => {
      return total + (household.people?.length || 0);
    }, 0) || 0) + attendees.people?.length;

  const currentIteration =
    activePotluckIterations[0] ||
    upcomingPotluckIterations[0] ||
    pastPotluckIterations[0];
  const currentPotluckCount = currentIteration?.potlucks?.length || 0;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/potlucks">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Create New Group
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/people">
              <UserPlusIcon className="mr-2 h-4 w-4" />
              Sign Up New People
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total People</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAttendees}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last quarter
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Households</CardTitle>
            <HomeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendees.households?.length || 0}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +10.5% from last quarter
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Singles</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendees.people?.length || 0}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +5.2% from last quarter
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Potluck Groups
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPotluckCount}</div>
            {/* <p className="text-xs text-muted-foreground">
              +1 from last quarter
            </p> */}
          </CardContent>
        </Card>
      </div>
      {activePotluckIterations.length > 0 && (
        <PotluckIterationList
          title="Current Active Potluck Groups"
          potluckIterations={activePotluckIterations}
        />
      )}
      {upcomingPotluckIterations.length > 0 && (
        <PotluckIterationList
          title="Upcoming Potluck Groups"
          potluckIterations={upcomingPotluckIterations}
        />
      )}
      {pastPotluckIterations.length > 0 && (
        <PotluckIterationList
          title="Previous Potluck Groups"
          potluckIterations={pastPotluckIterations}
        />
      )}
    </div>
  );
}
