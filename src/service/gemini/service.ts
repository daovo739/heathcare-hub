import {
  ChatSession,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/utils/firebaseConfig';
import { CollectDataForm } from '@/app/w/CollectData';

const GENERATION_CONFIG = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};
const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function initializeChatbot(): Promise<
  | { success: true; chatSession: ChatSession }
  | {
      success: false;
      error: string;
    }
> {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ''
    );
    const model = genAI.getGenerativeModel({
      model: process.env.NEXT_PUBLIC_MODEL_NAME ?? '',
    });

    const chatSession: ChatSession = model.startChat({
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
      history: [],
    });

    return { success: true, chatSession };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function handleUserInput(input: {
  dataForm?: CollectDataForm;
  userInput: string;
  chatSession?: ChatSession;
}): Promise<
  | {
      success: true;
      response: string;
    }
  | { success: false; error: string }
> {
  const { dataForm, userInput, chatSession } = input;
  if (!chatSession) {
    return {
      success: false,
      error: 'Chatbot not initialized. Please refresh the page.',
    };
  }

  try {
    const result = await chatSession.sendMessage(userInput);
    if (dataForm) await saveChatLog(dataForm, result.response.text());
    return { success: true, response: result.response.text() };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function saveChatLog(
  dataForm: CollectDataForm,
  botResponse: string
): Promise<void> {
  try {
    const chatLogRef = doc(db, 'chatLogs', Date.now().toString());
    await setDoc(chatLogRef, {
      dataForm,
      botResponse,
      timestamp: new Date().toISOString(),
    });
    console.log('Chat log saved successfully!');
  } catch (error) {
    console.error('Error saving chat log:', error);
  }
}

export async function getChatLogs() {
  try {
    const chatLogsRef = collection(db, 'chatLogs');

    const queryBuilder = query(chatLogsRef, orderBy('timestamp', 'asc'));

    const querySnapshot = await getDocs(queryBuilder);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as {
        dataForm: CollectDataForm;
        botResponse: string;
        timestamp: string;
      }),
    }));
  } catch (error) {
    console.error('Error fetching chat logs:', error);
    throw new Error('Unable to fetch chat logs.');
  }
}

export async function generateFromImage(base64: string, file: File) {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ''
    );
    const model = genAI.getGenerativeModel({
      model: process.env.NEXT_PUBLIC_MODEL_NAME ?? '',
    });

    const rs = await file.arrayBuffer();

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(rs).toString('base64'),
          mimeType: 'image/jpeg',
        },
      },
      'Hãy cho biết thực phẩm trong ảnh là gì, nó bao nhiêu kcal cho một khẩu phần ăn và nên ăn nó vào khi nào, tần suất như thế nào để có chế độ dinh dưỡng hợp lý',
    ]);

    return result.response.text();
  } catch (error) {
    console.log(error);
  }
}
