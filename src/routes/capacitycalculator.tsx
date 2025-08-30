import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout } from "@/components/SharedLayout";
import { CapacityCalculator } from "@/components/CapacityCalculator";

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
