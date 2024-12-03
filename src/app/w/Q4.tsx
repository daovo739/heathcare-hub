import { Input } from '@/components/ui/input'
import { Heading } from './Heading'
import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { CircleHelp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { CollectDataForm } from './CollectData'

export function Q4() {
  const { setValue, watch } = useFormContext<CollectDataForm>()
  const [goal, setGoal] = useState<'general' | 'exact'>('general')

  const currentTarget = watch('target')

  return (
    <div>
      <Heading
        title="Mục tiêu của bạn là gì?"
        subTitle="Thông tin này cho phép chúng tôi gợi ý các bữa ăn giúp bạn đạt được mục tiêu của mình."
      />

      <div className="p-6 w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-semibold">
            Đặt mục tiêu
          </label>
          <ToggleGroup
            variant="outline"
            type="single"
            value={goal}
            onValueChange={value => {
              setGoal(value as 'general' | 'exact')
            }}
          >
            <ToggleGroupItem
              value="general"
              className={cn({
                'bg-blue-600 border-blue-600 text-white': goal === 'general',
              })}
            >
              Mục tiêu chung
            </ToggleGroupItem>
            <ToggleGroupItem
              value="exact"
              className={cn({
                'bg-blue-600 border-blue-600 text-white': goal === 'exact',
              })}
            >
              Mục tiêu chính xác
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {goal === 'general' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Tối muốn</label>
              <CircleHelp size={18} />
            </div>
            <ToggleGroup
              variant="outline"
              type="single"
              value={currentTarget.type}
              onValueChange={value => {
                setValue(
                  'target.type',
                  value as 'Giảm cân' | 'Duy trì cân nặng' | 'Xây dựng cơ bắp'
                )
              }}
            >
              <ToggleGroupItem
                value="Giảm cân"
                className={cn({
                  'bg-blue-600 border-blue-600 text-white':
                    currentTarget.type === 'Giảm cân',
                })}
              >
                Giảm cân
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Duy trì cân nặng"
                className={cn({
                  'bg-blue-600 border-blue-600 text-white':
                    currentTarget.type === 'Duy trì cân nặng',
                })}
              >
                Duy trì cân nặng
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Xây dựng cơ bắp"
                className={cn({
                  'bg-blue-600 border-blue-600 text-white':
                    currentTarget.type === 'Xây dựng cơ bắp',
                })}
              >
                Xây dựng cơ bắp
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}

        {goal === 'exact' && (
          <>
            <div className="flex items-center justify-between">
              <label className="block mb-2 text-sm font-semibold">
                Mục tiêu cân nặng của bạn
              </label>
              <div className="flex">
                <Input
                  type="number"
                  min={1}
                  prefix="kg"
                  className="w-16"
                  onChange={e => setValue('target.weight', +e.target.value)}
                />
                <span className="mt-2 ml-2">kg</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="block mb-2 text-sm font-semibold">
                Thay đổi cân nặng mục tiêu
              </label>
              <div className="flex">
                <Input
                  type="number"
                  min={1}
                  prefix="kg"
                  className="w-16"
                  onChange={e =>
                    setValue('target.weightEachWeek', +e.target.value)
                  }
                />
                <span className="mt-2 ml-2">kg mỗi tuần</span>
              </div>
            </div>
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded-md">
              CDC và các chuyên gia y tế khuyến cáo không nên tăng cân quá 0,9
              kg mỗi tuần.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
