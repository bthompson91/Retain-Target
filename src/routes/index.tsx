import { createFileRoute } from "@tanstack/react-router";
import { RosterBoard } from "@/components/roster-board";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <RosterBoard />;
}
