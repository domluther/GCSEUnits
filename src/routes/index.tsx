import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScoreButton, QuizButton } from "@/components";
import { useState } from "react";
import { FileSizeCalculator } from "@/components/FileSizeCalculator";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	// Mode state: 0 = File Size, 1 = Storage, 2 = Unit Convertor
	const [mode, setMode] = useState(0);
	// Dummy score for now
	const scoreButton = (
		<ScoreButton
			levelEmoji="🦆"
			levelTitle="Duckling Logic"
			points={56}
			onClick={() => {}}
		/>
	);

	// Mode button data
	const MODES = [
		"File Size Calculator",
		"Capacity Calculator",
		"Converting Units",
	];

	return (
		<SiteLayout
			title="File Size Practice"
			subtitle="Master file size calculations and conversions"
			scoreButton={scoreButton}
			titleIcon="🦆"
		>
			{/* Mode Switch Buttons */}
			<div className="flex justify-center gap-4 mt-8 mb-8">
				{MODES.map((option, i) => (
					<QuizButton
						key={option}
						variant="menu"
						className={
							mode === i
								? "text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-lg"
								: ""
						}
						onClick={() => setMode(i)}
					>
						{option}
					</QuizButton>
				))}
			</div>
			{/* Main Body: Only File Size Calculator for now */}
			<div className="max-w-2xl mx-auto">
				{mode === 0 && <FileSizeCalculator />}
				{mode !== 0 && (
					<div className="text-center text-gray-400 py-16 text-xl">
						Coming soon!
					</div>
				)}
			</div>
		</SiteLayout>
	);
}
