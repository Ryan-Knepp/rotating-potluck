import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/use-api";
import Wizard from "@/components/potluck/wizard";

const attendeesQueryOptions = (fetcher) => ({
  queryKey: ["attendees"],
  queryFn: () => fetcher(`${import.meta.env.VITE_API_URL}/api/v1/attendees`),
});

export const Route = createFileRoute("/_auth/potlucks")({
  loader: ({ context: { queryClient, api } }) =>
    queryClient.ensureQueryData(attendeesQueryOptions(api.fetcher)),
  component: Potlucks,
});

function Potlucks() {
  const { fetcher } = useApi();
  const attendeesQuery = useSuspenseQuery(attendeesQueryOptions(fetcher));
  const attendees = attendeesQuery.data;

  return (
    <>
      <div className="w-full mx-auto py-10 px-2">
        <Wizard attendees={attendees} />
      </div>
    </>
  );
}
