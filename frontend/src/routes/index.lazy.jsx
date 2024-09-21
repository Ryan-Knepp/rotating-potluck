import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [attendees, setAttendees] = useState({});
  const [potluckIterations, setPotluckIterations] = useState([]);

  useEffect(() => {
    async function getAttendees() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/attendees`,
        {
          credentials: "include",
        }
      );

      const attendees = await response.json();
      setAttendees(attendees);
    }

    async function getPotluckIterations() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/potluck_iterations`,
        {
          credentials: "include",
        }
      );

      const potluckIterations = await response.json();
      setPotluckIterations(potluckIterations);
    }

    getAttendees();
    getPotluckIterations();
  }, []);

  return (
    <>
      <h1>Potluck Dashboard</h1>
      <a href="/logout">Logout</a>
    </>
  );
}
