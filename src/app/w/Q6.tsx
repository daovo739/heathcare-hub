import { useFormContext } from 'react-hook-form';
import { CollectDataForm } from './CollectData';
import { Heading } from './Heading';
import { NutritionInfo } from '@/components/NutritionInfo';

export function Q6() {
  const { getValues } = useFormContext<CollectDataForm>();

  const data = getValues();

  return (
    <div>
      <Heading
        title="Đặt mục tiêu dinh dưỡng"
        subTitle="Hãy xem các mục tiêu dinh dưỡng hàng ngày mà chúng tôi đã ước tính cho bạn dựa trên hồ sơ của bạn."
      />

      <NutritionInfo data={data} />
    </div>
  );
}
