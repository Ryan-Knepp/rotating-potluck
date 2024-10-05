import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useApi } from "@/hooks/use-api";

export function DataTable({ columns, search }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });
  const { fetcher } = useApi();

  const dataQuery = useQuery({
    queryKey: ["people", pagination, search],
    queryFn: () =>
      fetcher(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/people/search?name=${search}&page=${pagination.pageIndex + 1}`
      ),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });
  const defaultData = useMemo(() => [], []);

  const tableColumns = useMemo(() => columns, []);
  const table = useReactTable({
    data: dataQuery.data?.people ?? defaultData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    rowCount: dataQuery.data?.total,
  });

  if (dataQuery.isLoading) {
    return <SkeletonTable />;
  }
  return (
    <div className="mx-2 md:mx-0 rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={header.column.columnDef.meta?.className}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cell.column.columnDef.meta?.className}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}

export function DataTablePagination({ table }) {
  return (
    <div className="flex items-center justify-center px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronFirst className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronLast className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  const headers = [
    { title: "", id: "name" },
    { title: "Email", id: "email" },
    { title: "Phone", id: "phone" },
    { title: "", id: "actions" },
  ];
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow key="header">
            {headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  <span>{header.title}</span>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(25)
            .fill({})
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell key={`${index}-name`}>
                  <div className="flex items-center">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-8 w-[145px]" />
                  </div>
                </TableCell>
                <TableCell key={`${index}-email`}>
                  <Skeleton className="h-8 w-[180px]" />
                </TableCell>
                <TableCell key={`${index}-phone`}>
                  <Skeleton className="h-8 w-[115px]" />
                </TableCell>
                <TableCell key={`${index}-actions`}>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-[100px] rounded-md" />
                    <Skeleton className="h-9 w-[125px] rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
