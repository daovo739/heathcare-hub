'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { diaryGroup, foodsData } from './dashboard/constants';
import { createContext } from 'react';

export interface FoodHistory {
  diaryGroup: (typeof diaryGroup)[number];
  foods: (typeof foodsData)[number];
  quantity: number;
  totalKcal: number;
}

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
    date: Date | null;
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
  foodHistories: FoodHistory[];
  setFoodHistories: Dispatch<SetStateAction<FoodHistory[]>>;
  surveyData: SurveyData;
  updateSurveyData: (newData: Partial<SurveyData>) => void;
  generalHealthData: GeneralHealthData | null;
  updateGeneralHealthData: (newData: GeneralHealthData) => void;
}

const AppContext = createContext<AppContext | undefined>(undefined);

const queryClient = new QueryClient();

export function Provider({ children }: PropsWithChildren) {
  const [foodHistories, setFoodHistories] = useState<FoodHistory[]>([]);

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
