import {ChatSession, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai";

const GENERATION_CONFIG = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};
const SAFETY_SETTINGS = [
    {category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
    {category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
    {category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
    {category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE},
];


export async function initializeChatbot(): Promise<{ success: true, chatSession: ChatSession } | {
    success: false,
    error: string
}> {
    try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? '');
        const model = genAI.getGenerativeModel({model: process.env.NEXT_PUBLIC_MODEL_NAME ?? ''});

        const chatSession: ChatSession = model.startChat({
            generationConfig: GENERATION_CONFIG,
            safetySettings: SAFETY_SETTINGS,
            history: [],
        });

        return {success: true, chatSession};
    } catch (error) {
        return {success: false, error: (error as Error).message};
    }
}

export async function handleUserInput(userInput: string, chatSession?: ChatSession): Promise<{
    success: true,
    response: string
} | { success: false, error: string }> {
    if (!chatSession) {
        return {success: false, error: "Chatbot not initialized. Please refresh the page."};
    }

    try {
        const result = await chatSession.sendMessage(userInput);

        return {success: true, response: result.response.text()};
    } catch (error) {
        return {success: false, error: (error as Error).message};
    }
}
