'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { handleUserInput } from '@/service/gemini/service';
import {
  fallBackGeneralHealthData,
  generateDashboardPrompt,
} from '@/utils/dashboard.utils';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  BadgeAlert,
  Beef,
  FileClock,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ButtonCard from '../../components/ButtonCard';
import { useAppContext } from '../Provider';
import { AddFoodDialog } from './AddFoodDialog';
import { diaryGroup } from './constants';
import { calculateTotalKcal } from './lib';

const GeneralHealthInfoTag = ({ statusName }: { statusName?: string }) => {
  switch (statusName) {
    case 'tốt':
      return <Sparkles className="text-success" />;

    case 'cảnh báo':
      return <TriangleAlert className="text-warning" />;

    case 'nghiêm trọng':
      return <BadgeAlert className="text-error" />;
    default:
      return null;
  }
};

export default function Page() {
  const router = useRouter();
  const {
    surveyData,
    generalHealthData,
    updateGeneralHealthData,
    foodHistories,
    chatSession,
  } = useAppContext();

  const shouldRefetchGeneralHealthData =
    generalHealthData?.status?.situation ===
    'Vui lòng nhập đầy đủ thông tin về tuổi tác, chiều cao, cân nặng, mục tiêu và tiền sử bệnh lý để đánh giá.';

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['surveyData'],
    queryFn: async () => {
      const prompt = generateDashboardPrompt(surveyData);

      return await handleUserInput({
        userInput: prompt,
        chatSession: chatSession,
      });
    },
    refetchOnWindowFocus: false,
    enabled:
      (!!surveyData && !generalHealthData) ||
      (!!generalHealthData && shouldRefetchGeneralHealthData),
  });
  const currentKcal = calculateTotalKcal(foodHistories);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (data?.success) {
      try {
        const healthData = JSON.parse(data?.response);
        updateGeneralHealthData(healthData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        updateGeneralHealthData(fallBackGeneralHealthData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const caloTarget = generalHealthData?.energy?.caloTarget ?? 0;

  return (
    <div>
      <div className="flex flex-col mb-8">
        <h1 className="font-bold text-2xl">Tổng quan sức khỏe</h1>
        <span className="text-sm">Ngày 6 tháng 12, 2024</span>
      </div>

      <section className="flex flex-col gap-16">
        <div className="text-neutral-900 bg-white p-4 px-6 rounded-lg max-h-[16rem] overflow-auto relative">
          {isFetching && (
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          )}
          {!isFetching && isSuccess && (
            <GeneralHealthInfoTag
              statusName={generalHealthData?.status?.name?.toLowerCase()}
            />
          )}
          <span className="italic text-base">
            {!isFetching && isSuccess && generalHealthData?.status?.situation}
          </span>{' '}
          {!isFetching &&
            isSuccess &&
            generalHealthData?.status?.situation ===
              'Vui lòng nhập đầy đủ thông tin về tuổi tác, chiều cao, cân nặng, mục tiêu và tiền sử bệnh lý để đánh giá.' && (
              <Link
                href="/get-started"
                className="text-info italic text-base underline"
              >
                Trở lại khảo sát.
              </Link>
            )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Calo */}
          <div className="mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 cursor-pointer w-full">
            {isFetching ? (
              <div className="space-y-2">
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <span className="text-2xl text-blue-500 mr-2">🌡️</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    Kcal tiêu thụ
                  </h2>
                </div>
                <div className="text-center mb-4">
                  <span className="text-4xl font-semibold text-gray-900">
                    <span className="text-primary">{currentKcal}</span> /{' '}
                    <span className="text-blue-400">{caloTarget ?? '?'}</span>
                  </span>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span
                    className={cn(
                      'px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg',
                      {
                        'bg-red-100 text-red-700': currentKcal > caloTarget,
                      }
                    )}
                  >
                    {currentKcal > caloTarget
                      ? 'Cần giảm cân'
                      : currentKcal < caloTarget / 2
                      ? 'Cần bổ sung thêm'
                      : 'Cân đối'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  {currentKcal > caloTarget
                    ? 'Bạn cần giảm lượng calo tiêu thụ hàng ngày'
                    : currentKcal < caloTarget / 2
                    ? 'Hãy bổ sung thêm calo'
                    : 'Bạn đang ở trạng thái cân đối'}
                </p>
              </>
            )}
          </div>

          {/* Thông tin bữa ăn */}
          <div
            className="mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 flex flex-col justify-center cursor-pointer w-full"
            onClick={() => setOpenModal(true)}
          >
            <div className="flex items-center justify-center mb-4">
              <Beef className="text-red-500" size={32} />
            </div>
            <div className="text-center mb-4">
              <span className="text-3xl font-semibold text-gray-900">
                Bữa ăn
              </span>
            </div>
            <div className="flex justify-center gap-2 items-center text-primary font-semibold">
              <span>Cập nhật bữa ăn ngay</span>
              <ArrowRight size={22} />
            </div>
          </div>

          {/* history */}
          <div
            className="mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 flex flex-col justify-center cursor-pointer w-full"
            onClick={() => router.push('/history')}
          >
            <div className="flex items-center justify-center mb-4">
              <FileClock className="text-neutral-600" size={32} />
            </div>
            <div className="text-center mb-4">
              <span className="text-3xl font-semibold text-gray-900">
                Lịch sử
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-hidden">
          <div className="col-span-1 flex flex-col gap-4 h-[20rem] justify-between">
            <div
              className="mx-auto p-4 h-[9.5rem] bg-white shadow-lg rounded-lg border border-gray-200 cursor-pointer w-full"
              onClick={() => router.push('/w')}
            >
              <ButtonCard
                title="Khám phá đề xuất dinh dưỡng"
                subtitle="Nhận chế độ ăn uống cá nhân hóa dựa trên mục tiêu sức khỏe của bạn"
                hero="Đi đến trang đề xuất"
              />
            </div>
            <div
              className="mx-auto p-4 h-[9.5rem] bg-white shadow-lg rounded-lg border border-gray-200 cursor-pointer w-full"
              onClick={() => router.push('/gen-image')}
            >
              <ButtonCard
                title="Scan thực phẩm của bạn"
                subtitle="Sử dụng hình ảnh để phân tích thành phần dinh dưỡng và nhận đề xuất bữa ăn phù hợp"
                hero="Scan ngay"
              />
            </div>
          </div>

          <div className="px-4 col-span-1 h-[20rem] bg-white shadow-lg rounded-lg border border-gray-200 cursor-pointer overflow-auto">
            {diaryGroup.map((group, index) => (
              <Accordion key={group} type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{group}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col">
                      {foodHistories[group].map((food, index) => (
                        <li key={index} className="flex items-center w-full">
                          <span className="w-1/2 truncate">
                            {food.foods.name}
                          </span>
                          <span className="w-1/4">
                            {food.quantity} {food.unit}
                          </span>
                          <span className="w-1/4">{food.totalKcal} kcal</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>
      {openModal && (
        <AddFoodDialog open={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
