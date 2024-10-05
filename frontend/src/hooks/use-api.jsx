import { createContext, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./use-auth";

const ApiContext = createContext(null);

export function ApiProvider({ children, router }) {
  const toast = useToast();
  const { clearUser } = useAuth();
  const fetcher = async (
    url,
    { ...options } = {
      method: "GET",
      credentials: "include",
    }
  ) => {
    if (options.body) {
      options.headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };
    }
    const response = await fetch(url, options);

    if (response.ok) {
      return await response.json();
    }
    if (response.status === 401) {
      clearUser();
      setTimeout(() => {
        router.navigate({
          to: "/login",
          search: { reason: "Log in again to continue" },
        });
      }, 100);
    }

    toast({
      title: "Error",
      description: "Failed to fetch data",
      status: "error",
    });
  };

  return (
    <ApiContext.Provider
      value={{
        fetcher,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}
