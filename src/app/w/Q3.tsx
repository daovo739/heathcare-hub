import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { CollectDataForm } from './CollectData';
import { Heading } from './Heading';

export function Q3() {
  const { setValue, watch } = useFormContext<CollectDataForm>();

  const currentUnit = watch('units');
  const currentEnergy = watch('energyUnit');

  return (
    <div>
      <Heading
        title="Bạn đo lường mọi thứ như thế nào?"
        subTitle="Chúng ta sẽ sử dụng điều này để đặt mục tiêu và hiển thị số lượng trong công thức nấu ăn."
      />

      <div className="p-6 w-full mx-auto space-y-6">
        {/* Preferred Units */}
        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-semibold">
            Đơn vị đo lường yêu thích
          </label>
          <ToggleGroup
            variant="outline"
            type="single"
            value={currentUnit}
            onValueChange={(value) => {
              setValue('units', value as 'Tiêu chuẩn Mỹ' | 'Hệ mét');
            }}
          >
            <ToggleGroupItem
              value="Tiêu chuẩn Mỹ"
              className={cn({
                'bg-primary border-primary text-white':
                  currentUnit === 'Tiêu chuẩn Mỹ',
              })}
            >
              Tiêu chuẩn Mỹ
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Hệ mét"
              className={cn({
                'bg-primary border-primary text-white':
                  currentUnit === 'Hệ mét',
              })}
            >
              Hệ mét
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Preferred Unit of Energy */}
        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-semibold">
            Đơn vị năng lượng yêu thích
          </label>
          <div className="flex gap-4">
            <ToggleGroup
              variant="outline"
              type="single"
              value={currentEnergy}
              onValueChange={(value) => {
                setValue('energyUnit', value as 'Calo' | 'Kilojoule');
              }}
            >
              <ToggleGroupItem
                value="Calo"
                className={cn({
                  'bg-primary border-primary text-white':
                    currentEnergy === 'Calo',
                })}
              >
                Kcal
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Kilojoule"
                className={cn({
                  'bg-primary border-primary text-white':
                    currentEnergy === 'Kilojoule',
                })}
              >
                Kilojoule
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
