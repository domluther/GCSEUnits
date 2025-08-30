import { createFileRoute } from "@tanstack/react-router";
import { FileSizeCalculator } from "@/components/FileSizeCalculator";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/filesize")({
	component: FileSizeCalculatorPage,
});

function FileSizeCalculatorPage() {
	return (
		<SiteLayout
			title="File Size Calculator"
			subtitle="Calculate file sizes and conversions for GCSE CS."
		>
			<FileSizeCalculator />
		</SiteLayout>
	);
}
