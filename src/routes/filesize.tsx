import { createFileRoute } from "@tanstack/react-router";
import { SharedLayout } from "@/components";
import { FileSizeCalculator } from "@/components/FileSizeCalculator";

export const Route = createFileRoute("/filesize")({
	component: FileSizePage,
});

function FileSizePage() {
	return (
		<SharedLayout>
			{(recordScoreAndUpdate) => (
				<FileSizeCalculator onScoreUpdate={recordScoreAndUpdate} />
			)}
		</SharedLayout>
	);
}
