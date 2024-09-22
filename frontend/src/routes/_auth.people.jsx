import { createFileRoute } from "@tanstack/react-router";
import { columns } from "@/components/people/columns";
import { DataTable } from "@/components/people/data-table";
import Search from "@/components/search";
import { useState } from "react";
import useDebounce from "@/hooks/use-debounce";

export const Route = createFileRoute("/_auth/people")({
  component: People,
});

function People() {
  const [search, setSearch] = useState("");
  const [delay, setDelay] = useState(500);
  const debouncedSearch = useDebounce(search, delay);

  const onSubmit = (value) => {
    setDelay(0);
    setTimeout(() => setDelay(500), 100);
  };
  return (
    <div className="container mx-auto py-10">
      <Search value={search} setValue={setSearch} onSubmit={onSubmit} />
      <DataTable columns={columns()} search={debouncedSearch} />
    </div>
  );
}
