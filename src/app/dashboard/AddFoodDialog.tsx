'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { handleUserInput } from '@/service/gemini/service';
import { useMutation } from '@tanstack/react-query';
import { Heart, Loader2, X } from 'lucide-react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { DiaryGroup, useAppContext } from '../Provider';
import { generatePromptFromUser } from './actions';
import { diaryGroup, foodsData } from './constants';

type Foods = typeof foodsData;

interface Props {
  open: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

interface FoodGenerated {
  mealTime: (typeof diaryGroup)[number];
  dish: string;
  quantity: number;
  unit: string;
  calories: number;
}

export const AddFoodDialog = ({ open, setOpenModal }: Props) => {
  const { setFoodHistories, chatSession } = useAppContext();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState<Foods[number] | null>(null);
  const [diary, setDiary] = useState<(typeof diaryGroup)[number]>(
    diaryGroup[0]
  );
  const [unit, setUnit] = useState<Foods[number]['units'][number] | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [text, setText] = useState('');
  const [option, setOption] = useState<'Thêm thủ công' | 'Thêm từ văn bản'>(
    'Thêm thủ công'
  );

  const [foodGenerated, setFoodGenerated] = useState<FoodGenerated[]>([]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['addFood'],
    mutationFn: async () => {
      const prompt = generatePromptFromUser(text);

      return await handleUserInput({
        dataForm: undefined,
        userInput: prompt,
        chatSession: chatSession,
      });
    },
    onSuccess: (data) => {
      if (data && 'response' in data) {
        setFoodGenerated(JSON.parse(data.response));
      }
    },
  });

  const options = useMemo(() => {
    return foodsData.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Dialog open={open}>
      <DialogContent
        className={cn(
          'h-[90vh] w-[90vh] max-w-[90vh] flex flex-col overflow-auto',
          {
            'flex flex-col gap-8': option === 'Thêm từ văn bản',
          }
        )}
      >
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-2xl">Thêm món ăn</DialogTitle>
          <DialogClose
            className="flex justify-end cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            <X />
          </DialogClose>
        </DialogHeader>

        <div className="flex gap-4 w-1/2">
          <Button
            variant={'outline'}
            onClick={() => setOption('Thêm thủ công')}
            className={cn('rounded-lg w-full', {
              'bg-primary text-white': option === 'Thêm thủ công',
            })}
          >
            Thêm thủ công
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setOption('Thêm từ văn bản')}
            className={cn('rounded-lg w-full', {
              'bg-primary text-white': option === 'Thêm từ văn bản',
            })}
          >
            Thêm từ văn bản
          </Button>
        </div>

        {option === 'Thêm thủ công' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <h2 className="font-bold text-2xl bg-primary text-white p-2 px-4 rounded-t-lg">
              Tên món ăn
            </h2>
            <Input
              className="rounded-none focus-visible:ring-0 focus-visible:shadow-none"
              placeholder="Tìm kiếm món ăn"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <ul className="flex-1 overflow-auto rounded-b-lg border-slate-300 border solid ">
              {options.map((food, index) => {
                return (
                  <li
                    key={index}
                    className={cn('p-2 px-4 cursor-pointer', {
                      'bg-slate-100': index % 2 === 0,
                      'bg-slate-200': index % 2 !== 0,
                      'bg-slate-400 text-white':
                        selectedFood?.name === food.name,
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

            {selectedFood && (
              <div className="bg-white rounded-lg shadow-lg gap-8 w-full justify-between px-4 grid grid-cols-2 mt-4">
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
                    onValueChange={(val) => setDiary(val as DiaryGroup)}
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
          </div>
        )}

        {option === 'Thêm từ văn bản' && (
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="Nhập thông tin bữa ăn của bạn"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <p className="flex gap-2 italic font-light">
              Nhập thông tin về các bữa ăn của bạn, nhập càng đầy đủ càng tốt
              nhé <Heart className="text-primary" />
            </p>

            <div>
              <Button
                onClick={() => {
                  if (!text)
                    return toast({
                      description: 'Vui lòng nhập thông tin bữa ăn',
                      variant: 'error',
                    });

                  mutate();
                }}
                className=" text-white bg-black hover:bg-black"
              >
                {isPending && <Loader2 size={24} className="animate-spin" />}
                Hoàn thành
              </Button>
            </div>

            <div>
              {!!foodGenerated.length && (
                <h2>Danh sách món ăn đã được tính toán:</h2>
              )}
              <ul className="max-h-[26rem] overflow-auto">
                {foodGenerated?.map((food, index) => (
                  <li key={index}>
                    <p>
                      <strong>Bữa ăn:</strong> {food.mealTime}
                    </p>
                    <p>
                      <strong>Món ăn:</strong> {food.dish}
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {food.quantity} {food.unit}
                    </p>
                    <p>
                      <strong>Lượng Calo:</strong> {food.calories} kcal
                    </p>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <DialogFooter className="w-full">
          {(option === 'Thêm thủ công' ||
            (option === 'Thêm từ văn bản' && isSuccess)) && (
            <Button
              onClick={() => {
                if (option === 'Thêm thủ công') {
                  if (!selectedFood || !unit || !diary) return;

                  setFoodHistories((prev) => ({
                    ...prev,
                    [diary]: [
                      ...(prev[diary] ?? []),
                      {
                        diaryGroup: diary,
                        foods: selectedFood,
                        quantity,
                        totalKcal: (unit.kcal ?? 0) * quantity,
                        unit: unit.unit,
                      },
                    ],
                  }));
                  toast({
                    title: 'Thành công',
                    description: 'Món ăn đã được thêm vào lịch sử ăn uống',
                    variant: 'success',
                  });
                  setSelectedFood(null);
                  return;
                }

                setFoodHistories((prev) => {
                  const updatedHistories = { ...prev };

                  foodGenerated.forEach((food) => {
                    updatedHistories[food.mealTime] = [
                      ...updatedHistories[food.mealTime],
                      {
                        diaryGroup: food.mealTime,
                        foods: {
                          name: food.dish,
                          nutrition: {
                            carbs: '',
                            fat: '',
                            protein: '',
                          },
                          units: [
                            {
                              kcal: food.calories,
                              unit: food.unit,
                              weight: '',
                            },
                          ],
                        },
                        quantity: food.quantity,
                        totalKcal: food.calories,
                        unit: food.unit,
                      },
                    ];
                  });

                  return updatedHistories;
                });
                toast({
                  variant: 'success',
                  title: 'Thành công',
                  description: 'Món ăn đã được thêm vào lịch sử ăn uống',
                });
              }}
            >
              Thêm món ăn
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
