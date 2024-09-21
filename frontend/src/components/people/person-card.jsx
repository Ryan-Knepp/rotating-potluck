import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignUpActions from "./signup-actions";

const getInitials = (name) => {
  const names = name.replace("-", " ").split(" ");
  return names.map((name) => name.charAt(0)).join("");
};

export default function PersonCard({ person }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <Avatar className="w-10">
              <AvatarImage src={person.avatar_url} className="object-cover" />
              <AvatarFallback>
                <div>{getInitials(person.name)}</div>
              </AvatarFallback>
            </Avatar>
            <p className="ml-2">{person.name}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-lg">
        <p>{person.email}</p>
        <p>{person.phone_number}</p>
      </CardContent>
      <CardFooter>
        <SignUpActions person={person} />
      </CardFooter>
    </Card>
  );
}
