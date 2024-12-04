'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { ProgressiveContainer } from '../_components/ProgressiveContainer';
import { useSurveyContext } from '../_contexts/SurveyContext';

const medicalConditions = [
  'Bệnh tiểu đường',
  'Tăng huyết áp',
  'Bệnh tim',
  'Hen suyễn',
  'Viêm khớp',
  'Khác',
];

export default function MedicalHistoryPage() {
  const router = useRouter();
  const { form } = useSurveyContext();
  const { control, getValues, setValue } = form;

  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    getValues('medicalHistory.conditions') ?? []
  );

  const handleConditionToggle = (condition: string) => {
    if (condition === 'Khác') {
      setValue('medicalHistory.otherCondition', '');
    }
    const conditions = getValues('medicalHistory.conditions');
    if (conditions?.includes(condition)) {
      const newSelectedConditions = conditions.filter((c) => c !== condition);
      setSelectedConditions(newSelectedConditions);
      setValue('medicalHistory.conditions', newSelectedConditions);
    } else {
      setSelectedConditions([...(conditions ?? []), condition]);
      setValue('medicalHistory.conditions', [...(conditions ?? []), condition]);
    }
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.trigger();
    router.push('/get-started/complete');
  };

  return (
    <ProgressiveContainer progress={75} title="Tiền sử sức khỏe">
      <form onSubmit={handleNext} className="space-y-2">
        {medicalConditions.map((condition) => (
          <div key={condition} className="flex items-center gap-2">
            <Checkbox
              id={condition}
              checked={selectedConditions.includes(condition)}
              onCheckedChange={() => handleConditionToggle(condition)}
            />
            <Label htmlFor={condition}>{condition}</Label>
          </div>
        ))}
        {selectedConditions.includes('Khác') && (
          <Controller
            name="medicalHistory.otherCondition"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder="Please specify other conditions"
                {...field}
              />
            )}
          />
        )}
        <div className="flex gap-3 mt-4 [&_button]:uppercase">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.push('/get-started/goals')}
          >
            trở lại
          </Button>
          <Button type="submit" className="flex-1">
            tiếp theo
          </Button>
        </div>
      </form>
    </ProgressiveContainer>
  );
}
