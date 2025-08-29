import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/contexts/theme-provider";

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider defaultTheme="system" storageKey="ui-theme">
			<div className="min-h-screen bg-background text-foreground">
				<div className="p-2 flex gap-2 justify-between items-center">
					<div className="flex gap-2">
						<Link to="/" className="[&.active]:font-bold">
							Home
						</Link>{" "}
						<Link to="/about" className="[&.active]:font-bold">
							About
						</Link>
					</div>
					<ThemeToggle />
				</div>
				<hr className="border-border" />
				<Outlet />
				<TanStackRouterDevtools />
			</div>
		</ThemeProvider>
	),
});
