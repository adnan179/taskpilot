import LandingPage from "@/pages/LandingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component:LandingPage,
})

