import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout, UnitConvertor } from "@/components";

export const Route = createFileRoute("/unitconvertor")({
	component: UnitConvertorPage,
});

function UnitConvertorPage() {
	return (
		<SharedLayout>
			{(recordScoreAndUpdate) => (
				<UnitConvertor onScoreUpdate={recordScoreAndUpdate} />
			)}
		</SharedLayout>
	);
}
