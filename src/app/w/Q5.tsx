import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Heading } from './Heading'
import { cn } from '@/lib/utils'
import { CircleHelp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useFormContext } from 'react-hook-form'
import { CollectDataForm } from './CollectData'

const activityLevels = [
  'Công việc văn phòng, tập thể dục nhẹ nhàng',
  'Hoạt động nhẹ, tập luyện 3-4 lần/tuần',
  'Hoạt động hàng ngày, tập luyện thường xuyên',
  'Rất năng động',
  'Vận động viên chuyên nghiệp',
]

export function Q5() {
  const { setValue, watch } = useFormContext<CollectDataForm>()

  const personalInfo = watch('personalInfo')

  return (
    <div>
      <Heading
        title="Hãy cho chúng tôi biết về bạn"
        subTitle="Thông tin này cho phép chúng tôi ước tính nhu cầu dinh dưỡng của bạn mỗi ngày."
      />

      <div className="p-6 w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-semibold">Giới tính</label>
          <ToggleGroup
            variant="outline"
            type="single"
            value={personalInfo.sex}
            onValueChange={value => {
              setValue('personalInfo.sex', value as 'Nam' | 'Nữ' | 'Khác')
            }}
          >
            <ToggleGroupItem
              value="Nam"
              className={cn({
                'bg-blue-600 border-blue-600 text-white':
                  personalInfo.sex === 'Nam',
              })}
            >
              Nam
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Nữ"
              className={cn({
                'bg-blue-600 border-blue-600 text-white':
                  personalInfo.sex === 'Nữ',
              })}
            >
              Nữ
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Khác"
              className={cn({
                'bg-blue-600 border-blue-600 text-white':
                  personalInfo.sex === 'Khác',
              })}
            >
              Khác
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-semibold">Chiều cao</label>
          <div className="flex">
            <Input
              type="number"
              min={1}
              prefix="kg"
              className="w-16"
              onChange={e => setValue('personalInfo.height', +e.target.value)}
            />
            <span className="mt-2 ml-2">cm</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-semibold">Cân nặng</label>
          <div className="flex">
            <Input
              type="number"
              min={1}
              prefix="kg"
              className="w-16"
              onChange={e => setValue('personalInfo.weight', +e.target.value)}
            />
            <span className="mt-2 ml-2">kg</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-semibold">Tuổi</label>
          <div className="flex">
            <Input
              type="number"
              min={1}
              prefix="kg"
              className="w-16"
              onChange={e => setValue('personalInfo.age', +e.target.value)}
            />
            <span className="mt-2 ml-2">years</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold">Chất béo</label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp size={18} />
                </TooltipTrigger>
                <TooltipContent className="text-balance w-96">
                  Tỷ lệ mỡ cơ thể là tổng khối lượng mỡ chia cho tổng khối lượng
                  cơ thể. Tỷ lệ mỡ cơ thể điển hình là 18-24% đối với nam giới
                  trung bình và 25-31% đối với nữ giới trung bình theo
                  wikipedia. Nếu bạn không biết lượng protein của mình thì đó
                  không phải là vấn đề lớn - chúng tôi chỉ sử dụng nó để ước
                  tính khối lượng cơ nạc của bạn và thay đổi lượng protein tối
                  thiểu được khuyến nghị trong công cụ tính toán dinh dưỡng.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ToggleGroup
            variant="outline"
            type="single"
            value={personalInfo.lipid}
            onValueChange={value => {
              setValue(
                'personalInfo.lipid',
                value as 'Cao' | 'Trung bình' | 'Thấp'
              )
            }}
          >
            <ToggleGroupItem
              value="Thấp"
              className={cn({
                'bg-blue-600 border-blue-600 text-white':
                  personalInfo.lipid === 'Thấp',
              })}
            >
              Thấp
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Trung bình"
              className={cn({
                'bg-blue-600 border-blue-600 text-white':
                  personalInfo.lipid === 'Trung bình',
              })}
            >
              Trung bình
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Cao"
              className={cn({
                'bg-blue-600 border-blue-600 text-white':
                  personalInfo.lipid === 'Cao',
              })}
            >
              Cao
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-semibold">
            Chế độ hoạt động
          </label>
          <Select onValueChange={val => setValue('personalInfo.activity', val)}>
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="Chọn hoạt động" />
            </SelectTrigger>
            <SelectContent>
              {activityLevels.map(level => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
