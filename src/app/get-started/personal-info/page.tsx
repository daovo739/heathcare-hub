'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';
import { ProgressiveContainer } from '../_components/ProgressiveContainer';
import { useSurveyContext } from '../_contexts/SurveyContext';

export default function PersonalInfoPage() {
  const router = useRouter();
  const { form } = useSurveyContext();
  const {
    control,
    formState: { errors },
  } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/get-started/goals');
  };

  return (
    <ProgressiveContainer progress={25} title="Thông tin cá nhân">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="age">Tuổi</Label>
            <Controller
              name="personalInfo.age"
              control={control}
              render={({ field }) => (
                <Input
                  id="age"
                  type="number"
                  placeholder="Nhập tuổi của bạn"
                  min={8}
                  max={120}
                  {...field}
                />
              )}
            />
            {errors.personalInfo?.age && (
              <p className="text-sm text-red-500 mt-1">
                {errors.personalInfo.age.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="gender">Giới tính</Label>
            <Controller
              name="personalInfo.gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính của bạn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.personalInfo?.gender && (
              <p className="text-sm text-red-500 mt-1">
                {errors.personalInfo.gender.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="height">Chiều cao (cm)</Label>
            <Controller
              name="personalInfo.height"
              control={control}
              render={({ field }) => (
                <Input
                  id="height"
                  type="number"
                  placeholder="Nhập chiều cao của bạn (cm)"
                  min={100}
                  max={250}
                  {...field}
                />
              )}
            />
            {errors.personalInfo?.height && (
              <p className="text-sm text-red-500 mt-1">
                {errors.personalInfo.height.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="weight">Cân nặng (kg)</Label>
            <Controller
              name="personalInfo.weight"
              control={control}
              render={({ field }) => (
                <Input
                  id="weight"
                  type="number"
                  placeholder="Nhập cân nặng của bạn (kg)"
                  min={30}
                  max={300}
                  {...field}
                />
              )}
            />
            {errors.personalInfo?.weight && (
              <p className="text-sm text-red-500 mt-1">
                {errors.personalInfo.weight.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 mt-4 [&_button]:uppercase">
          <Button type="submit" className="flex-1">
            tiếp theo
          </Button>
        </div>
      </form>
    </ProgressiveContainer>
  );
}
