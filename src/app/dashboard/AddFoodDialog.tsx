'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { diaryGroup, foodsData } from './constants';
import { X } from 'lucide-react';
import { FoodHistory, useAppContext } from '../Provider';

type Foods = typeof foodsData;

interface Props {
  open: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const AddFoodDialog = ({ open, setOpenModal }: Props) => {
  const { setFoodHistories } = useAppContext();

  const [search, setSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState<Foods[number] | null>(null);
  const [diary, setDiary] = useState<FoodHistory['diaryGroup']>(diaryGroup[0]);
  const [unit, setUnit] = useState<Foods[number]['units'][number] | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);

  const options = useMemo(() => {
    return foodsData.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Dialog open={open}>
      <DialogContent className="h-[90vh] w-[90vh] max-w-[90vh] overflow-auto">
        <DialogClose
          className="w-full flex justify-end cursor-pointer"
          onClick={() => setOpenModal(false)}
        >
          <X />
        </DialogClose>
        <DialogTitle className="text-2xl h-fit h-2">Thêm món ăn</DialogTitle>
        <div>
          <h2 className="font-bold text-2xl bg-primary text-white p-2 px-4 rounded-t-lg">
            Tên món ăn
          </h2>
          <Input
            className="rounded-none focus-visible:ring-0 focus-visible:shadow-none"
            placeholder="Tìm kiếm món ăn"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="h-[32rem] overflow-auto rounded-b-lg border-slate-300 border solid ">
            {options.map((food, index) => {
              return (
                <li
                  key={index}
                  className={cn('p-2 px-4 cursor-pointer', {
                    'bg-slate-100': index % 2 === 0,
                    'bg-slate-200': index % 2 !== 0,
                    'bg-slate-400 text-white': selectedFood?.name === food.name,
                  })}
                  onClick={() => {
                    setSelectedFood(food);
                    setUnit(food.units[0]);
                  }}
                >
                  {food.name}
                </li>
              );
            })}
          </ul>
        </div>

        {selectedFood && (
          <div className="bg-white rounded-lg shadow-lg gap-8 w-full justify-between px-4 grid grid-cols-2">
            {/* Left Section: Nutrition Information */}
            <div className="flex gap-4 col-span-1">
              <div className="flex-1 flex gap-4">
                {/* Nutrition Circle */}
                <div className="relative size-20 p-12 flex items-center justify-center whitespace-nowrap font-bold text-lg text-center border-4 border-solid border-primary rounded-full">
                  {(unit?.kcal ?? 0) * quantity} kcal
                </div>

                {/* Nutrition Stats */}
                <div className="text-center mt-2 text-base">
                  <p className="text-green-600 font-semibold">
                    Protein: {selectedFood?.nutrition.protein}
                  </p>
                  <p className="text-blue-600 font-semibold">
                    Net Carbs: {selectedFood?.nutrition.carbs}
                  </p>
                  <p className="text-red-600 font-semibold">
                    Fat: {selectedFood?.nutrition.fat}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 space-y-4 col-span-1">
              <Select
                onValueChange={(val) => setDiary(val as any)}
                value={diary}
              >
                <SelectTrigger
                  className="w-full"
                  defaultValue={diaryGroup.at(0)}
                >
                  <SelectValue placeholder="Chọn bữa ăn" />
                </SelectTrigger>
                <SelectContent>
                  {diaryGroup.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-4">
                <Input
                  placeholder="Số lượng"
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-14"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />

                <Select
                  onValueChange={(val) =>
                    setUnit(
                      selectedFood?.units.find((item) => item.unit === val)
                    )
                  }
                  value={unit?.unit}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn đơn vị phù hợp" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedFood?.units.map((v, i) => (
                      <SelectItem key={i} value={v.unit}>
                        {v.unit} - {v.weight} - {v.kcal} kcal
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="w-full">
          <Button
            onClick={() => {
              if (!selectedFood || !unit || !diary) return;

              setFoodHistories((prev) => [
                ...prev,
                {
                  foods: selectedFood,
                  diaryGroup: diary,
                  quantity,
                  totalKcal: (unit.kcal ?? 0) * quantity,
                },
              ]);
            }}
          >
            Thêm món ăn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
