'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { diaryGroup, foodsData } from './dashboard/constants';
import { createContext } from 'react';
import { ChatSession } from '@google/generative-ai';
import { initializeChatbot } from '@/service/gemini/service';

export type DiaryGroup = (typeof diaryGroup)[number];

export type FoodHistory = {
  [key in DiaryGroup]: {
    diaryGroup: DiaryGroup[number];
    foods: (typeof foodsData)[number];
    quantity: number;
    totalKcal: number;
    unit?: string;
  }[];
};

export type SurveyData = {
  goals: string[];
  personalInfo: {
    age: string;
    gender: string;
    height: string;
    weight: string;
  };
  medicalHistory?: {
    conditions?: string[];
    otherCondition?: string;
  };
};

export type GeneralHealthData = {
  energy?: {
    caloIn: number | null;
    caloTarget: number | null;
  };
  status?: {
    name: string | null;
    level: number | null;
    situation: string | null;
  };
  mealSchedule?: {
    mealType: string | null;
    time: string | null;
    advice: string | null;
  };
};

interface AppContext {
  surveyData: SurveyData;
  updateSurveyData: (newData: Partial<SurveyData>) => void;
  generalHealthData: GeneralHealthData | null;
  updateGeneralHealthData: (newData: GeneralHealthData) => void;
  foodHistories: FoodHistory;
  setFoodHistories: Dispatch<SetStateAction<FoodHistory>>;
  chatSession: ChatSession | undefined;
}

const AppContext = createContext<AppContext | undefined>(undefined);

const queryClient = new QueryClient();

export function Provider({ children }: PropsWithChildren) {
  const [foodHistories, setFoodHistories] = useState<FoodHistory>({
    'Bữa sáng': [],
    'Bữa trưa': [],
    'Bữa tối': [],
    'Bữa phụ': [],
    'Ăn vặt': [],
  });

  const [surveyData, setSurveyData] = useState<SurveyData>({
    goals: [],
    personalInfo: {
      age: '',
      gender: '',
      height: '',
      weight: '',
    },
    medicalHistory: {
      conditions: [],
      otherCondition: '',
    },
  });

  const [chatSession, setChatSession] = useState<ChatSession | undefined>(
    undefined
  );

  const updateSurveyData = (newData: Partial<SurveyData>) => {
    setSurveyData((prevData) => ({
      ...prevData,
      ...newData,
      personalInfo: { ...prevData.personalInfo, ...newData.personalInfo },
      medicalHistory: { ...prevData.medicalHistory, ...newData.medicalHistory },
    }));
  };

  const [generalHealthData, setGeneralHealthData] =
    useState<GeneralHealthData | null>(null);

  const updateGeneralHealthData = (newData: GeneralHealthData) => {
    setGeneralHealthData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    const createChatSession = async () => {
      const chatSession = await initializeChatbot();

      if ('chatSession' in chatSession) {
        setChatSession(chatSession.chatSession);
      }
    };

    createChatSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          foodHistories,
          setFoodHistories,
          surveyData,
          updateSurveyData,
          generalHealthData,
          updateGeneralHealthData,
          chatSession,
        }}
      >
        {children}
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
}
