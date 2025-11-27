'use client';

import { useState } from "react";

type QuizProps = {
    question: string;
    options: string[];
    answer: string;
    onAnswered: (isCorrect: boolean) => void;
};

export default function Quiz({ question, options, answer, onAnswered }: QuizProps) {
    const [message, setMessage] = useState("");

    const checkAnswer = (selectedOption: string) => {
        if (selectedOption === answer) {
            setMessage('Correct!');
        } else {
            setMessage(`Wrong! The correct answer is ${answer}.`);
        }
        setTimeout(() => {
            setMessage("");
            onAnswered(selectedOption === answer);
        }, 2000);
    };

    return (
        <>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">{question}</h2>
                <ul className="mb-4">
                    {options.map((option, index) => (
                        <li key={index} className="mb-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-left" onClick={() => checkAnswer(option)} disabled={message !== ""}>
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
                {message && <p className={message === 'Correct!' ? "text-green-500" : "text-red-500"}>{message}</p>}
            </div>
        </>
    );
}