import { createLazyFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import Wizard from "@/components/potluck/wizard";

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

export const Route = createLazyFileRoute("/potlucks")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(attendeesQueryOptions),
  component: Potlucks,
});

function Potlucks() {
  const attendeesQuery = useSuspenseQuery(attendeesQueryOptions);
  const attendees = attendeesQuery.data;

  return (
    <>
      <div className="w-full mx-auto py-10 px-2">
        <Wizard attendees={attendees} />
      </div>
    </>
  );
}
