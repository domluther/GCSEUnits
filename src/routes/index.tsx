import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	// Redirect to the default route (unit convertor)
	return <Navigate to="/unitconvertor" />;
}
