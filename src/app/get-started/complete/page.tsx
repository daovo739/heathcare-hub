'use client';

import { Button } from '@/components/ui/button';
import { ProgressiveContainer } from '../_components/ProgressiveContainer';
import { useSurveyContext } from '../_contexts/SurveyContext';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/contexts/AppContext';

export default function CompletePage() {
  const router = useRouter();
  const { updateSurveyData } = useAppContext();
  const { form } = useSurveyContext();
  const surveyData = form.getValues();
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    updateSurveyData(surveyData);
    router.push('/dashboard');
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
    </ProgressiveContainer>
  );
}
