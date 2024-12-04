'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const surveySchema = z.object({
  goals: z.array(z.string()).min(1).max(3),
  personalInfo: z.object({
    age: z.string().min(1, 'Nhập tuổi của bạn'),
    gender: z.string().min(1, 'Chọn giới tính của bạn'),
    height: z.string().min(1, 'Nhập chiều cao của bạn'),
    weight: z.string().min(1, 'Nhập cân nặng của bạn'),
  }),
  medicalHistory: z.object({
    conditions: z.array(z.string()).optional(),
    otherCondition: z.string().optional().optional(),
  }),
});

export type SurveyData = z.infer<typeof surveySchema>;

type SurveyContextType = {
  form: UseFormReturn<SurveyData>;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const form = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
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
    },
  });

  return (
    <SurveyContext.Provider value={{ form }}>{children}</SurveyContext.Provider>
  );
};

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurveyContext must be used within a SurveyProvider');
  }
  return context;
};
