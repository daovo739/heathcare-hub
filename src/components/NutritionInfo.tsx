import { CollectDataForm } from '@/app/w/CollectData';
import { User } from 'lucide-react';

export const NutritionInfo = ({ data }: { data: CollectDataForm }) => {
  return (
    <div className="p-4 border rounded-md bg-info/20 shadow-md">
      <div className="flex items-center gap-1 mb-2 text-info">
        <User size={30} />
        <h2 className="text-3xl font-black m-0">Thông tin của bạn</h2>
      </div>
      <div className="grid grid-cols-2">
        <div className="mb-4 [&_p]:text-lg">
          <h3 className="text-2xl font-bold text-info">Thông tin cá nhân:</h3>
          <p>
            <span className="font-medium">Hoạt động:</span>{' '}
            {data.personalInfo.activity}
          </p>
          <p>
            <span className="font-medium">Tuổi:</span> {data.personalInfo.age}
          </p>
          <p>
            <span className="font-medium">Chiều cao:</span>{' '}
            {data.personalInfo.height} cm
          </p>
          <p>
            <span className="font-medium">Cân nặng:</span>{' '}
            {data.personalInfo.weight} kg
          </p>
          <p>
            <span className="font-medium">Giới tính:</span>{' '}
            {data.personalInfo.sex}
          </p>
          <p>
            <span className="font-medium">Lipid:</span>{' '}
            {data.personalInfo.lipid}
          </p>
        </div>

        <div>
          <div className="mb-4 [&_p]:text-lg">
            <h3 className="text-2xl font-bold text-info">Mục tiêu:</h3>
            <p>
              <span className="font-medium">Loại mục tiêu:</span>{' '}
              {data.target.type}
            </p>
            {!!data.target.weight && (
              <p>Cân nặng mục tiêu: {data.target.weight} kg</p>
            )}
            {!!data.target.weightEachWeek && (
              <p>Thay đổi cân nặng mỗi tuần: {data.target.weightEachWeek} kg</p>
            )}
          </div>

          <div className="mb-4 [&_p]:text-lg">
            <h3 className="text-2xl font-bold text-info">
              Tùy chọn chế độ ăn:
            </h3>
            <p>
              <span className="font-medium">Đơn vị đo lường:</span> {data.units}
            </p>
            <p>
              <span className="font-medium">Năng lượng:</span> {data.energyUnit}
            </p>
            <p>
              <span className="font-medium">Chế độ ăn ưa thích:</span>{' '}
              {data.favoriteDiet}
            </p>
            <p>
              <span className="font-medium">Loại thực phẩm loại trừ:</span>{' '}
              {data.exclude.length > 0
                ? data.exclude.join(', ')
                : 'Không có thực phẩm bị loại trừ'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
