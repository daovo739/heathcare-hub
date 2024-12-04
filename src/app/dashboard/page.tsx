'use client';

import { ArrowRight, Beef, FileClock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ButtonCard from '../../components/ButtonCard';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col mb-8">
        <h1 className="font-bold text-2xl">Health Overview</h1>
        <span className="text-sm">Dec 6, 2024</span>
      </div>

      <section className="flex flex-col gap-16">
        <div className="text-neutral-900 bg-white p-4 px-6 rounded-lg max-h-[16rem] overflow-auto">
          <span className="italic text-base">
            Đây là khu vực cho lời khuyên. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Consectetur voluptate fugiat error
            consequatur illum! Eos iure voluptates, perferendis id dignissimos
            quis velit! Dignissimos beatae architecto aperiam fuga culpa quam
            sed. Dolores soluta illum a magnam corporis dolor possimus ipsum
            assumenda eos sapiente earum veritatis cum porro laborum, vitae
            eaque quidem voluptatem sunt. Natus saepe laborum velit facilis
            tempora, est voluptatibus. Eveniet molestiae quas quasi corporis
            commodi libero voluptatem fugiat, quo illo optio perferendis unde
            rem dicta nihil in animi pariatur magnam soluta earum eligendi natus
            sunt officia placeat? Deserunt, cumque? Repellendus mollitia atque
            aliquid eius deleniti, tempora dolorem illo beatae a dolores
            consequuntur? Harum animi voluptatum adipisci similique, repudiandae
            doloribus quo deserunt hic, voluptas ex tenetur aut. Magnam, ea
            quibusdam? Ipsum recusandae inventore temporibus, omnis perspiciatis
            est dicta et saepe, natus earum consequatur, deleniti quis numquam!
            In asperiores, voluptates accusantium fuga vel porro fugiat
            exercitationem ipsum atque laboriosam rerum cumque?
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Calo */}
          <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 cursor-pointer w-full">
            <div className="flex items-center mb-4">
              <span className="text-2xl text-blue-500 mr-2">🌡️</span>
              <h2 className="text-lg font-bold text-gray-800">Calo tiêu thụ</h2>
            </div>
            <div className="text-center mb-4">
              <span className="text-4xl font-semibold text-gray-900">
                600/ 2000
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
          <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 flex flex-col justify-center cursor-pointer w-full">
            <div className="flex items-center justify-center mb-4">
              <Beef className="text-red-500" size={32} />
            </div>
            <div className="text-center mb-4">
              <span className="text-3xl font-semibold text-gray-900">
                Bữa ăn
              </span>
            </div>
          </div>

          {/* history */}
          <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 flex flex-col justify-center cursor-pointer w-full">
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
          <div
            className="mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 cursor-pointer w-full"
            onClick={() => router.push('/w')}
          >
            <ButtonCard
              title="Khám phá đề xuất dinh dưỡng"
              subtitle="Nhận chế độ ăn uống cá nhân hóa dựa trên mục tiêu sức khỏe của bạn"
              hero="Đi đến trang đề xuất"
            />
          </div>
          <div className="mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200 col-span-1 cursor-pointer w-full">
            <ButtonCard
              title="Scan thực phẩm của bạn"
              subtitle="Sử dụng hình ảnh để phân tích thành phần dinh dưỡng và nhận đề xuất bữa ăn phù hợp"
              hero="Scan ngay"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
