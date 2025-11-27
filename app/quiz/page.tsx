'use client';

import Quiz from "@/app/component/Quiz";
import { useState } from "react";

export default function Page() {
    const [quizNumber, setQuizNumber] = useState(-1);
    const [score, setScore] = useState(0);
    const [toast, setToast] = useState("");

    const quizData = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Jupiter", "Mars", "Saturn"],
            answer: "Jupiter"
        }
    ];

    const handleAnswered = (isCorrect: boolean) => {
        setScore(prevScore => isCorrect ? prevScore + 1 : prevScore);
        if (quizNumber + 1 >= quizData.length) {
            setToast(`Quiz finished! Your score is ${score + (isCorrect ? 1 : 0)} out of ${quizData.length}`);
            setQuizNumber(-1);
            setScore(0);
        } else {
            setQuizNumber(prev => prev + 1);
        }
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center flex-col">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz Page</h1>
                    <div className="flex justify-end w-full">
                        <p className="text-lg font-semibold text-gray-500">Score: {score}</p>
                    </div>
                </div>
                {quizNumber == -1 ? (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                        setQuizNumber(prev => prev + 1)
                        setToast("");
                    }}>Start Quiz</button>
                ) : (
                    <Quiz
                        question={quizData[quizNumber].question}
                        options={quizData[quizNumber].options}
                        answer={quizData[quizNumber].answer}
                        onAnswered={handleAnswered}
                    />
                )}
                <div className="mt-4 text-lg font-semibold text-green-500">{toast}</div>
            </div>
        </>
    );
}