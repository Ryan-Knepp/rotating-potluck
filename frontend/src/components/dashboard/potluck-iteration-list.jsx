import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon } from "lucide-react";
import { getTotalAttendeesForPotluck, formatDateRange } from "@/lib/utils";

export default function PotluckIterationList({
  potluckIterations,
  title = "Potlucks",
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {potluckIterations.map((iteration) => (
            <div key={iteration.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {formatDateRange(iteration.date_range)}
                </h3>
                <Badge variant="secondary">
                  {iteration.potlucks.length} Potlucks
                </Badge>
              </div>
              <div className="space-y-2">
                {iteration.potlucks.map((potluck) => (
                  <div
                    key={potluck.id}
                    className="flex items-center justify-between bg-muted p-2 rounded-md"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={
                            potluck.host_household
                              ? potluck.host_household.avatar_url
                              : potluck.host_person.avatar_url
                          }
                          alt={
                            potluck.host_household
                              ? potluck.host_household.name
                              : potluck.host_person.name
                          }
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {potluck.host_household
                            ? potluck.host_household.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : potluck.host_person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">
                        {potluck.host_household
                          ? potluck.host_household.name
                          : potluck.host_person.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">
                        {getTotalAttendeesForPotluck(potluck)}
                      </p>
                      <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
