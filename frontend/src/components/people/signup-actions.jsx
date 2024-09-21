import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePersonMutation } from "../../hooks/use-person-mutation";

export default function SignUpActions({ person }) {
  const [signUpPersonMutation, signUpHouseholdMutation] = usePersonMutation();
  return (
    <div className="flex w-full justify-end space-x-2">
      {(person.signed_up || person.household_signed_up) && (
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-3 py-1 h-9"
        >
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>Signed Up</span>
        </Badge>
      )}
      {!person.signed_up && !person.household_signed_up && (
        <Button
          size="sm"
          onClick={() => {
            signUpPersonMutation.mutate(person);
          }}
        >
          Sign Up Person
        </Button>
      )}
      {!person.household_signed_up && person.pco_household && (
        <Button
          size="sm"
          onClick={() => {
            signUpHouseholdMutation.mutate(person);
          }}
        >
          Sign Up Household
        </Button>
      )}
    </div>
  );
}
