import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from 'react-hook-form';
import { CollectDataForm } from './CollectData';
import { Heading } from './Heading';
import { dietOptions } from './options';

export function Q1() {
  const { setValue, watch } = useFormContext<CollectDataForm>();

  return (
    <div className="w-full flex flex-col gap-1">
      <Heading
        title="Bạn thích ăn gì?"
        subTitle="Chọn chế độ ăn sẵn có. Bạn có thể tùy chỉnh thêm các thực phẩm loại trừ
          sau."
      />
      <RadioGroup
        onValueChange={(v) => {
          const option = dietOptions.find((item) => item.id === v);

          const name = option?.name || '';
          const exclude = option?.excludes || [];
          const currentExclude = watch('exclude');

          setValue('favoriteDiet', name);
          setValue('exclude', [...currentExclude, ...exclude]);
        }}
      >
        {dietOptions.map((diet) => (
          <div
            key={diet.id}
            className="flex items-center gap-4 border solid border-neutral-600 p-4 h-20 rounded-md w-full cursor-pointer"
          >
            <RadioGroupItem value={diet.id} id={diet.id} />
            <div className="flex items-center gap-2">
              {diet.Icon && <diet.Icon size={32} color={diet.iconColor} />}
              <Label
                htmlFor={diet.id}
                className="flex flex-col gap-1 cursor-pointer h-full w-full"
              >
                <span className="text-md font-bold">{diet.name}</span>

                <span className="italic text-sm">
                  Ngoại trừ:{' '}
                  {!!diet.excludes.length
                    ? diet.excludes.join(', ')
                    : 'Không có gì'}
                </span>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>

      <span className="text-balance text-sm">
        Không thấy chế độ ăn ưa thích của bạn? Chọn &apos;Bất kỳ&apos; rồi tùy
        chỉnh sau.
      </span>
    </div>
  );
}
