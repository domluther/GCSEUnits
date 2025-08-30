import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuizLogic } from "@/hooks/useQuizLogic";

interface Question {
	type: "sound" | "image" | "text" | "options" | "bitsFromOptions";
	params: { [key: string]: number };
	targetUnit: string;
	answer: number;
	explanation: string[];
}

function generateQuestion(): Question {
	// Simple example: 1MB image, ask for bits
	return {
		type: "image",
		params: { size: 1, unit: 1024 * 1024 },
		targetUnit: "bits",
		answer: 1 * 1024 * 1024 * 8,
		explanation: [
			"1MB = 1024 * 1024 bytes.",
			"Each byte = 8 bits.",
			"So 1MB = 1024 * 1024 * 8 bits.",
		],
	};
}

export function FileSizeCalculator() {
	const [question, setQuestion] = useState<Question | null>(null);
	const [userAnswer, setUserAnswer] = useState("");
	const [showFeedback, setShowFeedback] = useState(false);
	const [feedback, setFeedback] = useState<{
		isCorrect: boolean;
		message: string;
		explanation: string[];
	} | null>(null);
	const quizLogic = useQuizLogic({
		scoreManager: {
			getStreak: () => 0,
			getOverallStats: () => ({}),
		},
		onQuestionGenerate: () => {},
	});

	useEffect(() => {
		setQuestion(generateQuestion());
	}, []);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!question) return;
		const answerNum = Number(userAnswer);
		const isCorrect = Math.abs(answerNum - question.answer) < 0.01;
		setFeedback({
			isCorrect,
			message: isCorrect
				? "Correct!"
				: `Incorrect. The answer is ${question.answer}`,
			explanation: question.explanation,
		});
		setShowFeedback(true);
	}

	function handleNext() {
		setQuestion(generateQuestion());
		setUserAnswer("");
		setShowFeedback(false);
		setFeedback(null);
	}

	if (!question) return <div>Loading...</div>;

	return (
		<Card className="max-w-xl mx-auto mt-8">
			<CardHeader>
				<CardTitle>File Size Calculator</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="text-lg font-medium mb-2">
						Calculate the number of bits in a 1MB image.
					</div>
					<Input
						type="number"
						value={userAnswer}
						onChange={(e) => setUserAnswer(e.target.value)}
						placeholder="Enter your answer"
						className="mb-2"
					/>
					<Button type="submit">Submit</Button>
				</form>
				{showFeedback && feedback && (
					<Alert className="mt-4">
						<AlertDescription>
							<div
								className={
									feedback.isCorrect ? "text-green-700" : "text-red-700"
								}
							>
								{feedback.message}
							</div>
							<div className="mt-2 text-gray-700">
								<div className="font-semibold text-blue-900">Explanation:</div>
								{feedback.explanation.map((step, idx) => (
									<div key={idx} className="ml-4 mt-1 text-blue-700">
										{step}
									</div>
								))}
							</div>
							<Button className="mt-4" onClick={handleNext}>
								Next Question
							</Button>
						</AlertDescription>
					</Alert>
				)}
			</CardContent>
		</Card>
	);
}
