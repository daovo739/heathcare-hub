'use client';

import { ArrowRight, Beef, FileClock, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { handleUserInput, initializeChatbot } from '@/service/gemini/service';
import { generateDashboardPrompt } from '@/utils/dashboard.utils';
import ButtonCard from '../../components/ButtonCard';
import { AddFoodDialog } from './AddFoodDialog';
import { useEffect, useState } from 'react';
import { useAppContext } from '../Provider';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
  const router = useRouter();
  const {
    surveyData,
    generalHealthData,
    updateGeneralHealthData,
    foodHistories,
  } = useAppContext();
  console.log(foodHistories);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['surveyData'],
    queryFn: async () => {
      const prompt = generateDashboardPrompt(surveyData);
      const ai = await initializeChatbot();

      if ('chatSession' in ai) {
        return await handleUserInput({
          userInput: prompt,
          chatSession: ai.chatSession,
        });
      }
    },
    refetchOnWindowFocus: false,
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (data?.success) {
      const healthData = JSON.parse(data?.response);
      updateGeneralHealthData(healthData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <div className="flex flex-col mb-8">
        <h1 className="font-bold text-2xl">Tổng quan sức khỏe</h1>
        <span className="text-sm">Ngày 6 tháng 12, 2024</span>
      </div>

      <section className="flex flex-col gap-16">
        <div className="text-neutral-900 bg-white p-4 px-6 rounded-lg max-h-[16rem] overflow-auto relative">
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          )}
          {!isLoading &&
            isSuccess &&
            generalHealthData?.status?.name?.toLowerCase() === 'cảnh báo' && (
              <TriangleAlert className="text-warning" />
            )}
          <span className="italic text-base">
            {!isLoading && isSuccess && generalHealthData?.status?.situation}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Calo */}
          <div className="mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 cursor-pointer w-full">
            <div className="flex items-center mb-4">
              <span className="text-2xl text-blue-500 mr-2">🌡️</span>
              <h2 className="text-lg font-bold text-gray-800">Kcal tiêu thụ</h2>
            </div>
            <div className="text-center mb-4">
              <span className="text-4xl font-semibold text-gray-900">
                {generalHealthData?.energy?.caloIn ?? '?'} /{' '}
                {generalHealthData?.energy?.caloTarget ?? '?'}
              </span>
            </div>
            <div className="flex items-center justify-center mb-2">
              <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
                Normal
              </span>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Cần cố gắng thêm
            </p>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <div
              className="mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 cursor-pointer w-full"
              onClick={() => router.push('/w')}
            >
              <ButtonCard
                title="Khám phá đề xuất dinh dưỡng"
                subtitle="Nhận chế độ ăn uống cá nhân hóa dựa trên mục tiêu sức khỏe của bạn"
                hero="Đi đến trang đề xuất"
              />
            </div>
            <div className="mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 cursor-pointer w-full">
              <ButtonCard
                title="Scan thực phẩm của bạn"
                subtitle="Sử dụng hình ảnh để phân tích thành phần dinh dưỡng và nhận đề xuất bữa ăn phù hợp"
                hero="Scan ngay"
              />
            </div>
          </div>
        </div>
      </section>
      {openModal && (
        <AddFoodDialog open={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
