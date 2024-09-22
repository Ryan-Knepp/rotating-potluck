import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailsForm from "@/components/potluck/details-form";
import HostsLists from "@/components/potluck/hosts-lists";
import Review from "@/components/potluck/review";
import Stepper from "@/components/stepper";
import { useNavigate } from "@tanstack/react-router";

export default function Wizard({ attendees }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [potluckIterationId, setPoluckIterationId] = useState();
  const [config, setConfig] = useState();
  const [potlucks, setPotlucks] = useState([]);

  const navigate = useNavigate({ from: "/potlucks" });

  function getTotalPeople() {
    // big assumption that a signed up household will be 2 adults, don't count kids here
    return attendees.households.length * 2 + attendees.people.length;
  }

  const isHousehold = (person) => {
    return !!person.people;
  };

  async function onDetailsSubmit(data) {
    try {
      setPoluckIterationId(1);
      setCurrentStep(1);
      setConfig(data);
    } catch (e) {
      console.log(e);
    }
  }

  function onHostsSubmit(data) {
    const mergedAttendees = [...attendees.households, ...attendees.people];
    const groupCount =
      config.groupType === "hosts"
        ? config.groupNumber
        : (attendees.households.length + attendees.people.length) /
          config.groupNumber;

    // first shuffle hosts so we don't favor lower households with lower ids
    const shuffledHosts = data.hosts
      .map((host) => ({ host, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ host }) => host);
    const hosts = shuffledHosts
      .sort((a, b) => a.last_hosted_iteration - b.last_hosted_iteration)
      .slice(0, groupCount);
    const potlucks = hosts.map((host) => {
      return {
        host_household: host.household,
        host_person: host.person,
        attendees: [],
        potluck_iteration_id: potluckIterationId,
      };
    });
    const potluckAttendees = mergedAttendees.filter((attendee) => {
      if (isHousehold(attendee)) {
        return !hosts.some((host) =>
          host.household
            ? host.household.id === attendee.id
            : host.person.id === attendee.id
        );
      } else {
        return !hosts.some((host) =>
          host.household
            ? host.household.id === attendee.id
            : host.person.id === attendee.id
        );
      }
    });
    let potluckIndex = 0;
    while (potluckAttendees.length > 0) {
      const random = Math.floor(Math.random() * potluckAttendees.length);
      const attendee = potluckAttendees.splice(random, 1)[0];
      potlucks[potluckIndex % groupCount].attendees.push(attendee);
      potluckIndex++;
    }

    setPotlucks(potlucks);
    setCurrentStep(2);

    // TODO: we now have updates on who's willing and not willing to host, need to send a put to update this field for all
  }

  async function onReviewSubmit() {
    const potluckData = potlucks.map((potluck) => {
      return {
        host_household_id: isHousehold(potluck.host_household)
          ? potluck.host_household.id
          : null,
        host_person_id: !isHousehold(potluck.host_household)
          ? potluck.host_person.id
          : null,
        attendees: potluck.attendees.map((attendee) => ({
          household_id: isHousehold(attendee) ? attendee.id : null,
          person_id: !isHousehold(attendee) ? attendee.id : null,
        })),
      };
    });
    const body = {
      potlucks: potluckData,
      date_from: config.dateRange.from,
      date_to: config.dateRange.to,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/potluck_iterations`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        navigate({ to: "/dashboard" });
      } else {
        console.log(response);
        throw new Error("Failed to create potluck iteration");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const steps = ["Details", "Hosts", "Review"];

  return (
    <Card className="w-full max-w-screen-lg mx-auto">
      <CardHeader>
        <CardTitle className="mx-auto">Create Potluck Groups</CardTitle>
      </CardHeader>
      <CardContent className="px-1 md:px-6">
        <Stepper steps={steps} currentStep={currentStep} />
        {currentStep === 0 && (
          <DetailsForm
            onSubmit={onDetailsSubmit}
            householdCount={attendees.households.length}
            peopleCount={attendees.people.length}
            defaultValues={config}
          />
        )}

        {currentStep === 1 && (
          <HostsLists
            onSubmit={onHostsSubmit}
            onGoBack={() => setCurrentStep(0)}
            attendees={attendees}
          />
        )}
        {currentStep === 2 && (
          <Review
            onSubmit={onReviewSubmit}
            onGoBack={() => setCurrentStep(1)}
            potlucks={potlucks}
          />
        )}
      </CardContent>
    </Card>
  );
}
