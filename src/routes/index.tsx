import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizButton, ScoreButton, SiteLayout, StatsModal } from "@/components";
import { FileSizeCalculator } from "@/components/FileSizeCalculator";
import { ScoreManager } from "@/lib/scoreManager";
import { SITE_CONFIG } from "@/lib/siteConfig";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	// Mode state: 0 = File Size, 1 = Storage, 2 = Unit Convertor
	const [mode, setMode] = useState(0);
	const [showStatsModal, setShowStatsModal] = useState(false);

	const siteConfig = SITE_CONFIG;

	// Score manager
	const [scoreManager] = useState(
		() => new ScoreManager(siteConfig.siteKey, siteConfig.scoring.customLevels),
	);
	const overallStats = scoreManager.getOverallStats();
	// Mode button data
	const MODES = [
		"File Size Calculator",
		"Capacity Calculator",
		"Converting Units",
	];

	return (
		<SiteLayout
			title={siteConfig.title}
			subtitle={siteConfig.subtitle}
			titleIcon={siteConfig.icon}
			scoreButton={
				<ScoreButton
					levelEmoji={overallStats.level.emoji}
					levelTitle={overallStats.level.title}
					points={overallStats.totalPoints}
					onClick={() => setShowStatsModal(true)}
				/>
			}
		>
			{/* Mode Switch Buttons */}
			<div className="flex justify-center gap-4 mt-2 mb-8">
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
			<div className="max-w-4xl mx-auto">
				{mode === 0 && <FileSizeCalculator scoreManager={scoreManager} />}
				{mode !== 0 && (
					<div className="text-center text-gray-400 py-16 text-xl">
						Coming soon!
					</div>
				)}
			</div>
			<StatsModal
				isOpen={showStatsModal}
				onClose={() => setShowStatsModal(false)}
				scoreManager={scoreManager}
				title="Your Network Mastery"
			/>
		</SiteLayout>
	);
}
