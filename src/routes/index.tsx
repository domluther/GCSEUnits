import { createFileRoute } from "@tanstack/react-router";
import { SimpleThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Welcome Home!</h1>
					<p className="text-lg text-muted-foreground mt-2">
						This is a React + TypeScript + Vite template with theme support.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="p-4 rounded-lg border bg-card">
						<h2 className="text-xl font-semibold mb-2">Theme Support</h2>
						<p className="text-muted-foreground mb-4">
							Toggle between light, dark, and system themes.
						</p>
						<SimpleThemeToggle />
					</div>

					<div className="p-4 rounded-lg border bg-card">
						<h2 className="text-xl font-semibold mb-2">Modern Stack</h2>
						<ul className="text-sm text-muted-foreground space-y-1">
							<li>• React 19 + TypeScript</li>
							<li>• Vite + SWC</li>
							<li>• TanStack Router</li>
							<li>• Tailwind CSS v4</li>
							<li>• Vitest + Testing Library</li>
						</ul>
					</div>
				</div>

				<div className="p-4 rounded-lg bg-muted">
					<h3 className="font-medium mb-2">Color Palette Preview</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
						<div className="p-2 rounded bg-primary text-primary-foreground">
							Primary
						</div>
						<div className="p-2 rounded bg-secondary text-secondary-foreground">
							Secondary
						</div>
						<div className="p-2 rounded bg-accent text-accent-foreground">
							Accent
						</div>
						<div className="p-2 rounded bg-destructive text-destructive-foreground">
							Destructive
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
