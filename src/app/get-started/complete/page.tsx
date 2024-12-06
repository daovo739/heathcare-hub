'use client';

import { useAppContext } from '@/app/Provider';
import { PacManLoading } from '@/components/PacManLoading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { handleUserInput } from '@/service/gemini/service';
import {
  fallBackGeneralHealthData,
  generateDashboardPrompt,
} from '@/utils/dashboard.utils';
import { useMutation } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProgressiveContainer } from '../_components/ProgressiveContainer';
import { useSurveyContext } from '../_contexts/SurveyContext';
import { removeJsonCodeBlocks } from '@/app/dashboard/lib';

export default function CompletePage() {
  const router = useRouter();
  const { updateSurveyData, chatSession, updateGeneralHealthData } =
    useAppContext();
  const { form } = useSurveyContext();
  const surveyData = form.getValues();
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isPending } = useMutation({
    mutationKey: ['getGeneralHealthData'],
    mutationFn: async () => {
      const prompt = generateDashboardPrompt(surveyData);

      return await handleUserInput({
        userInput: prompt,
        chatSession: chatSession,
      });
    },
    onSuccess: (data) => {
      if ('response' in data) {
        console.log(data.response);

        try {
          const healthData = JSON.parse(removeJsonCodeBlocks(data?.response));
          updateGeneralHealthData(healthData);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          updateGeneralHealthData(fallBackGeneralHealthData);
        }
        router.push('/dashboard');
      }
    },
  });

  const onSubmit = () => {
    updateSurveyData(surveyData);
    mutate();
  };

  const canSubmit = Object.keys(errors).length === 0;

  return (
    <ProgressiveContainer progress={100} title="Hoàn thành">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center">
          {canSubmit
            ? 'Cảm ơn bạn đã hoàn thành khảo sát. Kế hoạch cá nhân của bạn đang được chuẩn bị.'
            : 'Vui lòng hoàn thành khảo sát'}
        </p>
        <div className="w-full text-sm">
          <h3 className="font-semibold mb-2">Phản hồi khảo sát của bạn:</h3>
          <p>
            <strong>Mục tiêu:</strong> {surveyData.goals.join(', ') || '-'}
          </p>
          <p>
            <strong>Tuổi:</strong> {surveyData.personalInfo.age || '-'}
          </p>
          <p>
            <strong>Giới tính:</strong>{' '}
            {surveyData.personalInfo.gender === 'male'
              ? 'Nam'
              : surveyData.personalInfo.gender === 'female'
              ? 'Nữ'
              : '-'}
          </p>
          <p>
            <strong>Chiều cao:</strong> {surveyData.personalInfo.height || '-'}{' '}
            (cm)
          </p>
          <p>
            <strong>Cân nặng:</strong> {surveyData.personalInfo.weight || '-'}{' '}
            (kg)
          </p>
          <p>
            <strong>Tiền sử sức khỏe:</strong>{' '}
            {surveyData?.medicalHistory?.conditions?.join(', ') || '-'}
          </p>
          {surveyData.medicalHistory.otherCondition && (
            <p>
              <strong>Tình trạng khác:</strong>{' '}
              {surveyData.medicalHistory.otherCondition}
            </p>
          )}
        </div>

        <div className="flex gap-3 mt-4 [&_button]:uppercase">
          {!canSubmit && (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/get-started/personal-info')}
            >
              trở lại
            </Button>
          )}
          <Button disabled={!canSubmit} className={cn('flex-1')} type="submit">
            Đi đến trang chủ
          </Button>
        </div>
      </form>

      {/* Backdrop */}
      {isPending && (
        <div className="fixed inset-0 w-screen h-screen bg-opacity-50 flex items-center justify-center z-50 bg-slate-800">
          <div className="relative">
            <div className="relative mb-12 ml-8">
              <PacManLoading />
            </div>
            <p className="mt-50 flex items-center font-bold gap-2 text-white">
              Đang khởi tạo dữ liệu, bạn đợi chút nhé!{' '}
              <Heart size={24} className="text-primary" />
            </p>
          </div>
        </div>
      )}
    </ProgressiveContainer>
  );
}
