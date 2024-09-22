import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePersonMutation() {
  const queryClient = useQueryClient();
  const signUpPersonMutation = useMutation({
    mutationFn: async (person) => {
      const url = person.id
        ? `${import.meta.env.VITE_API_URL}/api/v1/people/${person.id}`
        : `${import.meta.env.VITE_API_URL}/api/v1/people/`;
      const method = person.id ? "PUT" : "POST";
      const body = person.id
        ? { signed_up: true }
        : { ...person, signed_up: true };
      const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to sign up person");
      }
      return await response.json();
    },
    onMutate: async (newPerson) => {
      newPerson.signed_up = true;
      await queryClient.cancelQueries({
        queryKey: ["people", newPerson.pco_person],
      });
      const previousPerson = queryClient.getQueryData([
        "people",
        newPerson.pco_person,
      ]);
      queryClient.setQueryData(["people", newPerson.pco_person], newPerson);

      return { previousPerson, newPerson };
    },
    onError: (err, newPerson, context) => {
      queryClient.setQueryData(
        ["people", context.newPerson.pco_person],
        context.previousPerson
      );
    },
    onSettled: (newPerson) => {
      queryClient.invalidateQueries({
        queryKey: ["people", newPerson.pco_person],
      });
    },
  });

  const signUpHouseholdMutation = useMutation({
    mutationFn: async (person) => {
      const url = person.household_id
        ? `${import.meta.env.VITE_API_URL}/api/v1/households/${person.household_id}`
        : `${import.meta.env.VITE_API_URL}/api/v1/households/`;
      const method = person.household_id ? "PUT" : "POST";
      const body = person.household_id
        ? { signed_up: true, update_from_pco: true }
        : {
            pco_household: person.pco_household,
            signed_up: true,
            update_from_pco: true,
          };
      const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to sign up household");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["people"],
      });
    },
  });

  return [signUpPersonMutation, signUpHouseholdMutation];
}
