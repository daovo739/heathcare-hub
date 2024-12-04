'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

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

type AppContextType = {
  surveyData: SurveyData;
  updateSurveyData: (newData: Partial<SurveyData>) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  return (
    <AppContext.Provider value={{ surveyData, updateSurveyData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
