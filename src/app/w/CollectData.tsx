'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { handleUserInput } from '@/service/gemini/service';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Pizza } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { NutritionResult, Section } from '../../components/NutritionResult';
import { useAppContext } from '../Provider';
import { generateNutritionPrompt, parseFormattedText } from './action';
import { Q1 } from './Q1';
import { Q2 } from './Q2';
import { Q3 } from './Q3';
import { Q4 } from './Q4';
import { Q5 } from './Q5';
import { Q6 } from './Q6';
import { Q7 } from './Q7';
import { removeJsonCodeBlocks } from '../dashboard/lib';

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
  medicalHistory: string[];
  noteMedicalHistory: string;
}

export function CollectData() {
  const router = useRouter();
  const { surveyData, chatSession } = useAppContext();
  const [textWarning, setTextWarning] = useState<string>('');

  const defaultValues = useMemo<CollectDataForm>(
    () => ({
      step: 0,
      favoriteDiet: '',
      exclude: [],
      units: 'Hệ mét',
      energyUnit: 'Calo',
      target: {
        type: 'Giảm cân',
        weight: 0,
        weightEachWeek: 0,
      },
      personalInfo: {
        sex:
          surveyData.personalInfo.gender === 'female'
            ? 'Nữ'
            : surveyData.personalInfo.gender === 'male'
            ? 'Nam'
            : 'Khác',
        height: Number(surveyData.personalInfo.height) ?? 0,
        weight: Number(surveyData.personalInfo.weight) ?? 0,
        age: Number(surveyData.personalInfo.age) ?? 0,
        lipid: 'Trung bình',
        activity: '',
      },
      medicalHistory: surveyData?.medicalHistory?.conditions ?? [],
      noteMedicalHistory: surveyData.medicalHistory?.otherCondition ?? '',
    }),
    [surveyData]
  );

  const methods = useForm({ defaultValues });
  const currentStep = methods.watch('step');

  const [response, setResponse] = useState<Section | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CollectDataForm) => {
      const prompt = generateNutritionPrompt(data);

      return await handleUserInput({
        dataForm: data,
        userInput: prompt,
        chatSession: chatSession,
      });
    },
    onSuccess: (data) => {
      if (data && 'response' in data) {
        console.log(data.response);

        const d = parseFormattedText(data?.response);
        setResponse(d);

        if (Object.keys(d).length == 0) {
          setTextWarning(data.response);
        }
      }
    },
  });

  const renderStep = () => {
    if (response) {
      return <NutritionResult data={response} textWarning={textWarning} />;
    }

    switch (currentStep) {
      case 0:
        return <Q1 />;
      case 1:
        return <Q2 />;
      case 2:
        return <Q7 />;
      case 3:
        return <Q3 />;
      case 4:
        return <Q4 />;
      case 5:
        return <Q5 />;
      case 6:
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
            {Array.from({ length: 7 }).map((_, index) => {
              if (index === currentStep)
                return <Pizza key={index} size={28} className="text-primary" />;

              return (
                <div
                  key={index}
                  className={cn(
                    'size-3 rounded-full border border-solid cursor-pointer',
                    {
                      'bg-primary': index < currentStep,
                      'border-primary': index > currentStep,
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
            {currentStep < 6 && (
              <Button
                onClick={() => methods.setValue('step', currentStep + 1)}
                type="button"
              >
                Tiếp tục
              </Button>
            )}

            {currentStep === 6 && (
              <div className="flex gap-2">
                {response && (
                  <Button
                    type="submit"
                    className="bg-green-700 hover:bg-green-600"
                  >
                    {isPending && (
                      <Loader2 size={24} className="animate-spin" />
                    )}
                    Thử kết quả khác
                  </Button>
                )}
                <Button
                  type={response ? 'button' : 'submit'}
                  disabled={isPending}
                  onClick={() => {
                    if (response && !isPending) {
                      router.push('/dashboard');
                    }
                  }}
                >
                  {isPending && !response && (
                    <Loader2 size={24} className="animate-spin" />
                  )}
                  {response ? 'Đi đến trang chủ' : 'Hoàn thành'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
