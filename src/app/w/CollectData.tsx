'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, Pizza } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { generateNutritionPrompt, parseFormattedText } from './action';
import { Q1 } from './Q1';
import { Q2 } from './Q2';
import { Q3 } from './Q3';
import { Q4 } from './Q4';
import { Q5 } from './Q5';
import { Q6 } from './Q6';
import { handleUserInput, initializeChatbot } from '@/service/gemini/service';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { NutritionResult, Section } from '../../components/NutritionResult';
import { NutritionInfo } from '@/components/NutritionInfo';

export interface CollectDataForm {
  step: number;
  favoriteDiet: string;
  exclude: string[];
  units: 'Tiêu chuẩn Mỹ' | 'Hệ mét';
  energyUnit: 'Calo' | 'Kilojoule';
  target: {
    type: 'Giảm cân' | 'Duy trì cân nặng' | 'Xây dựng cơ bắp';
    weight: number;
    weightEachWeek: number;
  };
  personalInfo: {
    sex: 'Nam' | 'Nữ' | 'Khác';
    height: number;
    weight: number;
    age: number;
    lipid: 'Cao' | 'Trung bình' | 'Thấp';
    activity: string;
  };
}

const defaultValues: CollectDataForm = {
  step: 0,
  favoriteDiet: '',
  exclude: [],
  units: 'Tiêu chuẩn Mỹ',
  energyUnit: 'Calo',
  target: {
    type: 'Giảm cân',
    weight: 0,
    weightEachWeek: 0,
  },
  personalInfo: {
    sex: 'Nam',
    height: 0,
    weight: 0,
    age: 0,
    lipid: 'Trung bình',
    activity: '',
  },
};

export function CollectData() {
  const methods = useForm({ defaultValues });
  const currentStep = methods.watch('step');

  const [response, setResponse] = useState<Section | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CollectDataForm) => {
      const prompt = generateNutritionPrompt(data);

      const ai = await initializeChatbot();

      if ('chatSession' in ai) {
        return await handleUserInput({
          dataForm: data,
          userInput: prompt,
          chatSession: ai.chatSession,
        });
      }
    },
    onSuccess: (data) => {
      if (data && 'response' in data) {
        console.log(data.response);
        setResponse(parseFormattedText(data.response));
      }
    },
  });

  const renderStep = () => {
    if (response) {
      return <NutritionResult data={response} />;
    }

    switch (currentStep) {
      case 0:
        return <Q1 />;
      case 1:
        return <Q2 />;
      case 2:
        return <Q3 />;
      case 3:
        return <Q4 />;
      case 4:
        return <Q5 />;
      case 5:
        return <Q6 />;

      default:
        return null;
    }
  };

  const handleOnSubmit = async (data: CollectDataForm) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
        <div className="flex flex-col gap-8 items-end w-full">
          <div className="flex items-center gap-3 w-full justify-center">
            {Array.from({ length: 6 }).map((_, index) => {
              if (index === currentStep)
                return <Pizza key={index} size={28} color="#81BFDA" />;

              return (
                <div
                  key={index}
                  className={cn(
                    'size-3 rounded-full border border-solid cursor-pointer',
                    {
                      'bg-[#81BFDA]': index < currentStep,
                      'border-[#81BFDA]': index > currentStep,
                    }
                  )}
                  onClick={() => {
                    methods.setValue('step', index);
                    setResponse(null);
                  }}
                />
              );
            })}
          </div>
          <div className="min-h-[12rem] w-full">{renderStep()}</div>
          <div className="flex gap-2">
            <Button
              className="bg-slate-800 hover:bg-slate-700"
              disabled={currentStep === 0}
              onClick={() => {
                methods.setValue('step', currentStep - 1);
                setResponse(null);
              }}
              type="button"
            >
              Quay lại
            </Button>
            {currentStep < 5 && (
              <Button
                onClick={() => methods.setValue('step', currentStep + 1)}
                type="button"
              >
                Tiếp tục
              </Button>
            )}

            {currentStep === 5 && (
              <Button type="submit">
                {isPending && <Loader2 size={24} className="animate-spin" />}
                Hoàn thành
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
