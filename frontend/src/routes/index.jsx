import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, Calendar, CookingPot } from "lucide-react";
import pcoLogo from "@/assets/planning-center-full-color.svg";

export const Route = createFileRoute("/")({
  component: Index,
});

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="gap-2">
                <h1 className="p-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-br from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Welcome to the Church Potluck Organizer
                </h1>
                <p className="mx-auto max-w-[700px] text-neutral-500 md:text-xl">
                  Simplify your church's rotating potluck planning and
                  organization.
                </p>
              </div>
              <div className="space-y-2 mt-6">
                <p className="text-neutral-500">
                  Log in with your Planning Center account to get started.
                </p>
                <Button
                  onClick={console.log}
                  size="lg"
                  className="bg-gradient-to-br from-purple-600 to-cyan-600"
                >
                  Log in with Planning Center
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-100">
          <div className="px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-2 border-neutral-800 p-4 rounded-lg">
                <Users className="h-10 w-10 mb-2" />
                <h2 className="text-xl font-bold">Connect Your Community</h2>
                <p className="text-center text-neutral-500">
                  Bring your church members together through shared meals and
                  fellowship.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 border-neutral-800 p-4 rounded-lg">
                <Calendar className="h-10 w-10 mb-2" />
                <h2 className="text-xl font-bold">Easy Scheduling</h2>
                <p className="text-center text-neutral-500">
                  Effortlessly create and manage rotating potluck schedules.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 border-neutral-800 p-4 rounded-lg">
                <CookingPot className="h-10 w-10 mb-2" />
                <h2 className="text-xl font-bold">Diverse Menus</h2>
                <p className="text-center text-neutral-500">
                  Coordinate a variety of dishes to ensure delightful and
                  balanced meals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full px-2 md:px-4 py-4 md:py-6 border-t">
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Ryan Knepp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
