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

interface AppContext {
  foodHistories: FoodHistory[];
  setFoodHistories: Dispatch<SetStateAction<FoodHistory[]>>;
}

const AppContext = createContext<AppContext | undefined>(undefined);

const queryClient = new QueryClient();

export function Provider({ children }: PropsWithChildren) {
  const [foodHistories, setFoodHistories] = useState<FoodHistory[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ foodHistories, setFoodHistories }}>
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
