import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PersonCard from "@/components/people/person-card";
import SignUpActions from "@/components/people/signup-actions";

const getInitials = (name) => {
  const names = name.replace("-", " ").split(" ");
  return names.map((name) => name.charAt(0)).join("");
};

export const columns = () => {
  return [
    {
      id: "mobile",
      header: () => <span className="w-full m-auto text-lg">People</span>,
      cell: ({ row }) => {
        const person = row.original;
        return <PersonCard person={person} />;
      },
      meta: {
        className: "md:hidden",
      },
    },
    {
      id: "name",
      header: () => <span className="sr-only">Name</span>,
      cell: ({ row }) => {
        const person = row.original;
        return (
          <div className="flex items-center">
            <Avatar className="w-10">
              <AvatarImage src={person.avatar_url} className="object-cover" />
              <AvatarFallback>
                <div>{getInitials(person.name)}</div>
              </AvatarFallback>
            </Avatar>
            <p className="ml-2">{person.name}</p>
          </div>
        );
      },
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      accessorKey: "phone_number",
      header: "Phone",
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => {
        const person = row.original;

        return <SignUpActions person={person} />;
      },
      meta: {
        className: "hidden md:table-cell",
      },
    },
  ];
};
