import { CollectDataForm } from '@/app/w/CollectData';

export const NutritionInfo = ({ data }: { data: CollectDataForm }) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-md">
      <h2 className="text-xl font-bold mb-4">Thông tin của bạn</h2>
      <div className="mb-4">
        <h3 className="text-md font-semibold">Thông tin cá nhân:</h3>
        <p>Hoạt động: {data.personalInfo.activity}</p>
        <p>Tuổi: {data.personalInfo.age}</p>
        <p>Chiều cao: {data.personalInfo.height} cm</p>
        <p>Cân nặng: {data.personalInfo.weight} kg</p>
        <p>Giới tính: {data.personalInfo.sex}</p>
        <p>Lipid: {data.personalInfo.lipid}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold">Mục tiêu:</h3>
        <p>Loại mục tiêu: {data.target.type}</p>
        {!!data.target.weight && (
          <p>Cân nặng mục tiêu: {data.target.weight} kg</p>
        )}
        {!!data.target.weightEachWeek && (
          <p>Thay đổi cân nặng mỗi tuần: {data.target.weightEachWeek} kg</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold">Tùy chọn chế độ ăn:</h3>
        <p>Đơn vị đo lường: {data.units}</p>
        <p>Năng lượng: {data.energyUnit}</p>
        <p>Chế độ ăn ưa thích: {data.favoriteDiet}</p>
        <p>
          Loại thực phẩm loại trừ:{' '}
          {data.exclude.length > 0
            ? data.exclude.join(', ')
            : 'Không có thực phẩm bị loại trừ'}
        </p>
      </div>
    </div>
  );
};
