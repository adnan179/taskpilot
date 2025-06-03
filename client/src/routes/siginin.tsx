import { createFileRoute } from "@tanstack/react-router";
import SignInPage from "@/pages/SignInPage";

export const Route = createFileRoute("/siginin")({
    component:SignInPage,
})