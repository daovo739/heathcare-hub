'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ProgressiveContainer } from '../_components/ProgressiveContainer';
import { useSurveyContext } from '../_contexts/SurveyContext';
import { useState } from 'react';

const MAX_SELECTIONS = 3;
const goals = [
  'Giảm cân',
  'Duy trì cân nặng',
  'Tăng cân',
  'Tăng cơ',
  'Thay đổi chế độ ăn uống',
  'Quản lý căng thẳng',
  'Tăng số bước chân',
];

export default function GoalsPage() {
  const router = useRouter();
  const { form } = useSurveyContext();
  const { getValues, setValue } = form;

  const [currentGoals, setCurrentGoals] = useState<string[]>(
    getValues('goals')
  );

  const handleGoalSelection = (goal: string) => {
    const fieldGoals = getValues('goals');
    if (fieldGoals.includes(goal)) {
      const newSelectedGoals = fieldGoals.filter((g) => g !== goal);
      setCurrentGoals(newSelectedGoals);
      setValue('goals', newSelectedGoals);
    } else {
      setCurrentGoals([...fieldGoals, goal]);
      setValue('goals', [...fieldGoals, goal]);
    }
  };

  const isValid =
    currentGoals.length > 0 && currentGoals.length <= MAX_SELECTIONS;

  const handleNext = () => {
    if (isValid) {
      router.push('/get-started/medical-history');
    }
  };

  return (
    <ProgressiveContainer progress={50} title="Mục tiêu của bạn">
      {!isValid && !!currentGoals.length && (
        <p className="text-sm text-red-500">
          Vui lòng chọn nhiều nhất 3 mục tiêu.
        </p>
      )}
      {goals.map((goal) => (
        <Button
          key={goal}
          type="button"
          variant="outline"
          className={cn(
            'w-full h-12 text-gray-700',
            currentGoals.some((field) => field === goal) &&
              'border-primary bg-primary/10 hover:bg-primary/20'
          )}
          onClick={() => handleGoalSelection(goal)}
        >
          {goal}
        </Button>
      ))}

      <div className="flex gap-3 mt-4 [&_button]:uppercase">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => router.push('/get-started/personal-info')}
        >
          trở lại
        </Button>
        <Button
          type="button"
          className="flex-1"
          disabled={!isValid}
          onClick={handleNext}
        >
          tiếp theo
        </Button>
      </div>
    </ProgressiveContainer>
  );
}
