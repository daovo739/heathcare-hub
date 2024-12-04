"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import {handleUserInput, initializeChatbot} from "@/service/gemini/service";
import {ChatSession} from "@google/generative-ai";

export default function Home() {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chatSession, setChatSession] = useState<ChatSession>();

    useEffect(() => {
        const initChat = async () => {
            const result = await initializeChatbot();
            if (result.success) {
                setIsInitialized(true);
                setChatSession(result.chatSession)
                setMessages([{sender: "bot", text: "Chatbot initialized. How can I help you?"}]);
            } else {
                setError(result.error);
                setMessages([{sender: "bot", text: `Error initializing chatbot: ${result.error}`}]);
            }
        };

        initChat();
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, {sender: "user", text: input}]);
        setInput("");

        const response = await handleUserInput(input, chatSession);
        if (response.success) {
            setMessages((prev) => [...prev, {sender: "bot", text: response.response}]);
        } else {
            setMessages((prev) => [...prev, {sender: "bot", text: `Error: ${response.error}`}]);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-between p-8 sm:p-20 font-sans">
            <header className="flex flex-col items-center gap-4">
                <Image
                    className="dark:invert"
                    src="https://nextjs.org/icons/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
                <h1 className="text-xl font-bold">Chatbot with Next.js</h1>
            </header>

            <main className="flex flex-col items-center w-full max-w-2xl">
                {error ? (
                    <div className="text-red-500 font-bold">{error}</div>
                ) : (
                    <>
                        <div
                            className="chat-window border border-gray-300 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 w-full h-96 overflow-y-auto"
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 ${
                                        msg.sender === "user" ? "text-right text-blue-500" : "text-left text-gray-700"
                                    }`}
                                >
                                    <p className="text-sm">
                                        <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input flex gap-2 mt-4 w-full">
                            <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-800 dark:bg-gray-900 dark:text-white"
                                placeholder={isInitialized ? "Type your message..." : "Initializing..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={!isInitialized}
                            />
                            <button
                                className="bg-blue-500 text-white rounded-lg px-4 py-2 disabled:bg-gray-400"
                                onClick={sendMessage}
                                disabled={!isInitialized}
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </main>

            <footer className="flex gap-6 flex-wrap items-center justify-center mt-8">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Docs
                </a>
            </footer>
        </div>
    );
}
