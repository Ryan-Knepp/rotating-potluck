import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function getHouseholdPhones(household) {
  return household.people
    .filter((person) => !person.is_child)
    .map((person) => `${person.name}: ${person.phone_number}`)
    .join(", ");
}

function getHouseholdEmails(household) {
  return household.people
    .filter((person) => !person.is_child)
    .map((person) => `${person.name}: ${person.email}`)
    .join(", ");
}

function getAddress(person) {
  const address = person.address;
  return `${address.street_line_1},${address.street_line_2 ? ` ${address.street_line_2},` : ""} ${address.city}`;
}

function HostDetails({ host }) {
  const phone = host.people ? getHouseholdPhones(host) : host.phone_number;
  const email = host.people ? getHouseholdEmails(host) : host.email;
  const address = host.people ? getAddress(host.people[0]) : getAddress(host);

  return (
    <>
      <div className="hidden md:flex flex-row items-center gap-4 mb-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={host.avatar_url}
            alt={host.name}
            className="object-cover"
          />
          <AvatarFallback>
            {host.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{host.name}</h2>
          <p className="text-sm text-neutral-500">{address}</p>
          {host.people ? (
            host.people
              .filter((person) => !person.is_child)
              .map((person) => (
                <p key={person.id} className="text-sm text-neutral-500">
                  <span className="text-neutral-700">
                    {person.name.split(" ")[0]}
                  </span>
                  : {person.phone_number}, {person.email}
                </p>
              ))
          ) : (
            <>
              <p className="text-sm text-neutral-500">{phone}</p>
              <p className="text-sm text-neutral-500">{email}</p>
            </>
          )}
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={host.avatar_url}
              alt={host.name}
              className="object-cover"
            />
            <AvatarFallback>
              {host.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{host.name}</h2>
        </div>
        <div>
          <p className="text-sm text-neutral-500">{address}</p>
          {host.people ? (
            host.people
              .filter((person) => !person.is_child)
              .map((person) => (
                <p className="text-sm text-neutral-500">
                  <span className="text-neutral-700">
                    {person.name.split(" ")[0]}
                  </span>
                  : {person.phone_number}, {person.email}
                </p>
              ))
          ) : (
            <>
              <p className="text-sm text-neutral-500">{phone}</p>
              <p className="text-sm text-neutral-500">{email}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function AttendeeDetails({ attendee }) {
  const phone = attendee.people
    ? getHouseholdPhones(attendee)
    : attendee.phone_number;
  const email = attendee.people ? getHouseholdEmails(attendee) : attendee.email;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage
            src={attendee.avatar_url}
            alt={attendee.name}
            className="object-cover"
          />
          <AvatarFallback>
            {attendee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <p className="font-medium truncate">{attendee.name}</p>
      </div>
      <div className="flex-grow min-w-0">
        {attendee.people ? (
          attendee.people
            .filter((person) => !person.is_child)
            .map((person) => (
              <p key={person.id} className="text-sm text-neutral-500">
                <span className="text-neutral-700">
                  {person.name.split(" ")[0]}
                </span>
                : {person.phone_number}, {person.email}
              </p>
            ))
        ) : (
          <>
            <p className="text-sm text-neutral-500">{phone}</p>
            <p className="text-sm text-neutral-500">{email}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Review({ onSubmit, onGoBack, potlucks }) {
  const getPotluckKey = (potluck) => {
    return potluck.host_household
      ? `household-${potluck.host_household.id}`
      : `person-${potluck.host_person.id}`;
  };

  const getAttendeeKey = (attendee) => {
    return attendee.people
      ? `household-${attendee.id}`
      : `person-${attendee.id}`;
  };

  const getPotluckHost = (potluck) => {
    return potluck.host_household
      ? potluck.host_household
      : potluck.host_person;
  };

  return (
    <>
      <div className="w-full space-y-6">
        <Tabs defaultValue={getPotluckKey(potlucks[0])} className="w-full">
          <ScrollArea>
            <div className="w-full relative h-10 md:h-14">
              <TabsList className="flex absolute h-10 md:h-14">
                {potlucks.map((potluck) => (
                  <TabsTrigger
                    key={getPotluckKey(potluck)}
                    value={getPotluckKey(potluck)}
                  >
                    <Avatar className="w-8 h-8 hidden md:block">
                      <AvatarImage
                        src={getPotluckHost(potluck).avatar_url}
                        alt={getPotluckHost(potluck).name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {getPotluckHost(potluck)
                          .name.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2">{getPotluckHost(potluck).name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {potlucks.map((potluck) => (
            <TabsContent
              key={getPotluckKey(potluck)}
              value={getPotluckKey(potluck)}
              className="mt=0"
            >
              <Card className="w-full">
                <CardContent className="p-6">
                  <HostDetails host={getPotluckHost(potluck)} />
                  <h3 className="text-xl font-semibold mb-2">Guest List</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {potluck.attendees.map((guest) => (
                      <li key={getAttendeeKey(guest)}>
                        <AttendeeDetails
                          key={getAttendeeKey(guest)}
                          attendee={guest}
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onGoBack}>
            Previous
          </Button>
          <Button className="" onClick={onSubmit}>
            Finsih
          </Button>
        </div>
      </div>
    </>
  );
}
