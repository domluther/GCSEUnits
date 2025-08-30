import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ScoreManager } from "@/lib/scoreManager";

interface Question {
	category: "CalculateFileSize";
	type: "sound" | "image" | "text" | "options" | "bitsFromOptions";
	params: {
		[key: string]: number;
	};
	targetUnit: string;
	answer: number;
	explanation: string[];
}
interface FileSizeCalculatorProps {
	scoreManager: ScoreManager;
}

export function FileSizeCalculator({ scoreManager }: FileSizeCalculatorProps) {
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [userAnswer, setUserAnswer] = useState<string>("");
	const [feedback, setFeedback] = useState<{
		isCorrect: boolean;
		message: string;
		explanation: string[];
	} | null>(null);
	const [showHint, setShowHint] = useState<boolean>(false);
	const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const generateQuestion = (): void => {
		setHasSubmitted(false);
		const questionTypes = [
			generateImageQuestion,
			generateSoundQuestion,
			generateTextQuestion,
			generateBitsFromOptionsQuestion,
			generateOptionsQuestion,
		];
		const newQuestion =
			questionTypes[Math.floor(Math.random() * questionTypes.length)]();
		setCurrentQuestion(newQuestion);
		setUserAnswer("");
		setFeedback(null);
	};

	useEffect(() => {
		generateQuestion();
	}, []);

	const formatNumber = (num: number): string => {
		const parts = num.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	};

	const convertToUnit = (bits: number, targetUnit: string): number => {
		const conversions: { [key: string]: number } = {
			bits: 1,
			bytes: 8,
			kilobytes: 8 * 1000,
		};
		return bits / conversions[targetUnit];
	};

	const generateImageQuestion = (): Question => {
		const width = (Math.floor(Math.random() * 10) + 1) * 2; // 2-20 pixels (even numbers)
		const height = (Math.floor(Math.random() * 10) + 1) * 2; // 2-20 pixels
		const colourDepthOptions = [1, 2, 3, 4, 5, 6, 8];
		const colourDepth =
			colourDepthOptions[Math.floor(Math.random() * colourDepthOptions.length)];
		const targetUnit = ["bits", "bytes"][Math.floor(Math.random() * 2)];

		const sizeInBits = width * height * colourDepth;
		const answer = convertToUnit(sizeInBits, targetUnit);

		return {
			category: "CalculateFileSize",
			type: "image",
			params: { width, height, colorDepth: colourDepth },
			targetUnit,
			answer,
			explanation: [
				`Step 1: Identify the values`,
				`Width: ${width} pixels`,
				`Height: ${height} pixels`,
				`Color depth: ${colourDepth} bits`,
				`Step 2: Multiply width * height * color depth`,
				`${width} * ${height} * ${colourDepth} = ${sizeInBits} bits`,
				targetUnit !== "bits" ? `Step 3: Convert to ${targetUnit}` : "",
				targetUnit !== "bits"
					? `${sizeInBits} bits = ${formatNumber(answer)} ${targetUnit}`
					: "",
			].filter(Boolean), // Remove empty strings
		};
	};

	const generateSoundQuestion = (): Question => {
		const sampleRates = [20, 40, 60, 80];
		const sampleRate =
			sampleRates[Math.floor(Math.random() * sampleRates.length)];
		const duration = Math.floor(Math.random() * 10) + 1; // 1-10 seconds
		const bitDepth = [2, 4, 8][Math.floor(Math.random() * 3)];
		const targetUnit = ["bytes", "kilobytes"][Math.floor(Math.random() * 2)];

		const bits = sampleRate * duration * bitDepth;
		const answer = convertToUnit(bits, targetUnit);

		return {
			category: "CalculateFileSize",
			type: "sound",
			params: { sampleRate, duration, bitDepth },
			targetUnit,
			answer,
			explanation: [
				`Step 1: Identify the values`,
				`Sample rate: ${sampleRate} Hz`,
				`Duration: ${duration} seconds`,
				`Bit depth: ${bitDepth} bits`,
				`Step 2: Multiply sample rate × duration × bit depth`,
				`${sampleRate} × ${duration} × ${bitDepth} = ${bits} bits`,
				`Step 3: Convert to ${targetUnit}`,
				`${bits} bits = ${formatNumber(answer)} ${targetUnit}`,
			],
		};
	};

	const generateTextQuestion = (): Question => {
		const charCount = Math.floor(Math.random() * 2990) + 10; // 1000-6000 characters
		const bitsPerChar = 8; // ASCII
		const targetUnit = ["bytes", "kilobytes"][Math.floor(Math.random() * 2)];

		const bits = charCount * bitsPerChar;
		const answer = convertToUnit(bits, targetUnit);

		return {
			category: "CalculateFileSize",
			type: "text",
			params: { charCount, bitsPerChar },
			targetUnit,
			answer,
			explanation: [
				`Step 1: Identify the values`,
				`Number of characters: ${charCount}`,
				`Bits per character (ASCII): ${bitsPerChar}`,
				`Step 2: Multiply number of characters x bits per character`,
				`${charCount} x ${bitsPerChar} = ${bits} bits`,
				`Step 3: Convert to ${targetUnit}`,
				`${bits} bits = ${formatNumber(answer)} ${targetUnit}`,
			],
		};
	};

	const generateOptionsQuestion = (): Question => {
		const numOfBits = Math.floor(Math.random() * 7) + 1; // 1-8  bits
		const answer = 2 ** numOfBits;

		return {
			category: "CalculateFileSize",
			type: "options",
			params: { numOfBits },
			targetUnit: "bits",
			answer,
			explanation: [
				`Step 1: Identify the values`,
				`Number of bits: ${numOfBits}`,
				`Step 2: Calculate 2 ^ number of bits`,
				`2^${numOfBits} = ${answer} options`,
			],
		};
	};

	const generateBitsFromOptionsQuestion = (): Question => {
		const numberOfOptions = Math.floor(Math.random() * 255) + 1; // 1-256  options
		const answer = Math.ceil(Math.log(numberOfOptions) / Math.log(2));

		return {
			category: "CalculateFileSize",
			type: "bitsFromOptions",
			params: { numberOfOptions },
			targetUnit: "bits",
			answer,
			explanation: [
				`Step 1: Identify the values`,
				`Number of options: ${numberOfOptions}`,
				`Step 2: Use trial and error - which power of 2 is it less than?`,
				`2^1 = 2, 2^2 = 4, 2^3 = 8, 2=^4 = 16, 2^5 = 32, 2^6 = 64, 2^7 = 128, 2^8 = 256.`,
				`Answer: ${answer} bits`,
				`The Maths: Calculate log2(number of options)`,
				`log2(${numberOfOptions}) = ${answer} bits`,
			],
		};
	};

	const getQuestionText = (question: Question): string => {
		switch (question.type) {
			case "image":
				return `An image is ${question.params.width} pixels by ${question.params.height} pixels using a colour depth of ${question.params.colorDepth} bits. How large is the file? Give your answer in ${question.targetUnit}.`;
			case "sound":
				return `A sound file has a sample rate of ${question.params.sampleRate} Hz, duration of ${question.params.duration} seconds, and bit depth of ${question.params.bitDepth} bits. What is the file size in ${question.targetUnit}?`;
			case "text":
				return `A text file is stored in ASCII. It has ${question.params.charCount} characters. How large is the file in ${question.targetUnit}?`;
			case "options":
				return `A file uses ${question.params.numOfBits} bits to store each value. How many different options can it represent?`;
			case "bitsFromOptions":
				return `An image wants to use ${question.params.numberOfOptions} different colours. What's the minimum number of bits to store each pixel?`;
			default:
				return "";
		}
	};

	const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUserAnswer(e.target.value);
	};

	const checkAnswer = () => {
		if (!currentQuestion) return;
		const answerNum = Number(userAnswer);
		const isCorrect = Math.abs(answerNum - currentQuestion.answer) < 0.01;

		// Update score here
		scoreManager.recordScore(isCorrect, currentQuestion.category);

		setFeedback({
			isCorrect,
			message: isCorrect
				? "Correct! Well done!"
				: `Incorrect. The correct answer is ${formatNumber(currentQuestion.answer)}`,
			explanation: currentQuestion.explanation,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (hasSubmitted) return;
		checkAnswer();
		setHasSubmitted(true);
		if (inputRef.current) {
			inputRef.current.blur();
		}
	};

	const getCalculationHint = (): string => {
		if (!currentQuestion) return "Multiply the numbers";
		switch (currentQuestion.type) {
			case "image":
				return `📷 - colour depth * image height (px) * image width (px).`;
			case "sound":
				return `🔊 - sample rate (Hz) * duration (s) * bit depth`;
			case "text":
				return `🔤 - number of characters * bits per character (8 for ASCII)`;
			case "options":
				return `Number of options? 2 to the power of the number of bits`;
			case "bitsFromOptions":
				return `Bits needed for options? Log2(number of options) and round up`;
			default:
				return "";
		}
	};

	return (
		<div className="w-full">
			<div className="p-4">
				<Card className="mx-auto shadow-xl bg-white/80 backdrop-blur">
					<CardContent className="space-y-6 p-8">
						{currentQuestion ? (
							<>
								<div className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg shadow">
									{getQuestionText(currentQuestion)}
								</div>
								<form onSubmit={handleSubmit} className="space-y-4">
									<Input
										ref={inputRef}
										type="number"
										value={userAnswer}
										onChange={handleAnswerChange}
										placeholder="Enter your answer"
										disabled={hasSubmitted}
									/>
									<Button
										type="submit"
										disabled={hasSubmitted || userAnswer === ""}
									>
										Submit
									</Button>
								</form>

								<div className="flex justify-between items-center gap-3 mb-4">
									<span className="text-md md:text-lg">
										Show calculation help
									</span>
									<Button
										variant={showHint ? "secondary" : "outline"}
										onClick={() => setShowHint((v) => !v)}
									>
										{showHint ? "Hide" : "Show"}
									</Button>
								</div>
								{showHint && (
									<Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-none p-6">
										<AlertDescription className="text-lg md:text-xl font-semibold text-indigo-900">
											{getCalculationHint()}
										</AlertDescription>
									</Alert>
								)}
								{feedback && (
									<Alert
										className={
											feedback.isCorrect
												? "bg-green-100 border-green-300"
												: "bg-red-100 border-red-300"
										}
									>
										<AlertDescription>
											<div
												className={
													feedback.isCorrect ? "text-green-700" : "text-red-700"
												}
											>
												{feedback.message}
											</div>
											<div className="mt-2 text-gray-700">
												<div className="font-semibold text-blue-900">
													Explanation:
												</div>
												{feedback.explanation.map((step) => (
													<div key={step} className="ml-4 mt-1 text-blue-700">
														{step}
													</div>
												))}
											</div>
											<Button
												className="mt-4"
												onClick={() => {
													generateQuestion();
													setHasSubmitted(false);
													setUserAnswer("");
													setFeedback(null);
												}}
											>
												Next Question
											</Button>
										</AlertDescription>
									</Alert>
								)}
							</>
						) : (
							<div className="text-lg md:text-2xl text-center text-indigo-600">
								Click "New Question" to begin!
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
