import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { CollectDataForm } from './CollectData';
import { Heading } from './Heading';
import { medicalConditions as m } from '../get-started/medical-history/page';

const medicalConditions = [
  ...m.filter((i) => i !== 'Khác'),
  'Béo phì',
  'Bệnh thận mạn tính',
  'Chứng ngưng thở khi ngủ',
  'Lupus ban đỏ hệ thống',
  'Bệnh gout',
  'Bệnh Parkinson',
  'Bệnh Alzheimer',
  'Bệnh viêm gan',
  'Bệnh viêm gan B',
  'Bệnh viêm gan C',
  'Rối loạn chức năng gan',
  'Cận thị',
  'Rối loạn tâm thần (trầm cảm, lo âu, tâm thần phân liệt)',
  'Rối loạn tuyến giáp (cường giáp, suy giáp)',
];

export function Q7() {
  const { setValue, watch } = useFormContext<CollectDataForm>();

  const medicalHistory = watch('medicalHistory');

  return (
    <div>
      <Heading
        title="Các bênh nền của bạn"
        subTitle="Thông tin này giúp chúng tôi đưa ra các gợi ý dinh dưỡng phù hợp với bạn."
      />

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Các bệnh nền phổ biến</h2>
        <div className="flex flex-wrap gap-2">
          {medicalConditions.map((item) => (
            <Button
              variant="outline"
              className={cn('rounded-md hover:bg-primary hover:text-white', {
                'bg-primary text-white': medicalHistory.includes(item),
              })}
              key={item}
              onClick={() => {
                setValue(
                  'medicalHistory',
                  medicalHistory.includes(item)
                    ? medicalHistory.filter((i) => i !== item)
                    : [...medicalHistory, item]
                );
              }}
              type="button"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Các lưu ý khác</h2>
        <Textarea
          onChange={(e) => setValue('noteMedicalHistory', e.target.value)}
          value={watch('noteMedicalHistory')}
        />
      </div>
    </div>
  );
}
