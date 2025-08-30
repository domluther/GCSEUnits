import { createFileRoute } from "@tanstack/react-router";
import { CapacityCalculator, SharedLayout } from "@/components";

export const Route = createFileRoute("/capacitycalculator")({
	component: CapacityCalculatorPage,
});

function CapacityCalculatorPage() {
	return (
		<SharedLayout>
			{(recordScoreAndUpdate) => (
				<CapacityCalculator onScoreUpdate={recordScoreAndUpdate} />
			)}
		</SharedLayout>
	);
}
