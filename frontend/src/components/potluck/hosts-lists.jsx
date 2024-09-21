"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Component({ onSubmit, onGoBack, attendees }) {
  const [hosts, setHosts] = useState([
    ...attendees.households.filter((household) => household.willing_to_host),
    ...attendees.people.filter((people) => people.willing_to_host),
  ]);

  const [notHosts, setNotHosts] = useState([
    ...attendees.households.filter((household) => !household.willing_to_host),
    ...attendees.people.filter((people) => !people.willing_to_host),
  ]);

  const removeHost = (person) => {
    setHosts((hosts) => [
      ...hosts.filter(
        (host) => host.id !== person.id && host.name !== person.name
      ),
    ]);
    setNotHosts((notHosts) => [...notHosts, person]);
  };

  const addHost = (person) => {
    setNotHosts((notHosts) => [
      ...notHosts.filter(
        (notHost) => notHost.id !== person.id && notHost.name !== person.name
      ),
    ]);
    setHosts((hosts) => [...hosts, person]);
  };

  const isHousehold = (person) => {
    return !!person.people;
  };

  const isPerson = (person) => {
    return !person.people;
  };

  const handleSubmit = () => {
    onSubmit({
      hosts: hosts.map((host) =>
        isHousehold(host) ? { household: host } : { person: host }
      ),
      notHosts: notHosts.map((host) =>
        isHousehold(host) ? { household: host } : { person: host }
      ),
    });
  };

  return (
    <div className="space-y-8 px-1 md:px-6">
      <div>
        <h2 className="text-lg md:text-2xl font-bold mb-4">
          Hosts will be chosen from the following
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hosts.map((person) => (
            <Card key={`${person.id}-${person.name}`}>
              <CardContent className="flex flex-col justify-between p-4 gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10">
                    <AvatarImage
                      src={person.avatar_url}
                      alt={person.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{person.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto max-w-32"
                  onClick={() => removeHost(person)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Not willing to host</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notHosts.map((person) => (
            <Card key={`${person.id}-${person.name}`}>
              <CardContent className="flex flex-col justify-between p-4 gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10">
                    <AvatarImage
                      src={person.avatar_url}
                      alt={person.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{person.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto max-w-32"
                  onClick={() => addHost(person)}
                >
                  Add
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onGoBack}>
          Previous
        </Button>
        <Button className="" onClick={handleSubmit}>
          Create Potluck Groups
        </Button>
      </div>
    </div>
  );
}
