import { MealAnalysis } from '@/app/gen-image/lib';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Calendar, Carrot, Clock, FileHeart, Heater } from 'lucide-react';
import { Label } from './ui/label';

interface FoodInfoCardProps {
  foodInfo: MealAnalysis[];
}

const FoodInfoCard = ({ foodInfo }: FoodInfoCardProps) => {
  console.log(foodInfo);

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-orange-50 to-yellow-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <Carrot className="w-8 h-8 mr-2" />
          Thông tin về hình ảnh
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {foodInfo?.map((food, index) => (
          <div key={index}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-neutral-900 mb-2 flex items-center">
                {food?.name}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <Label className="text-primary flex items-center font-bold gap-1">
                  <Clock className="text-xl" />
                  <span>Thời điểm nên ăn:</span>
                </Label>
                <span>{food?.suggestedTimes?.join(', ')}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Label className="text-primary flex items-center font-bold gap-1">
                  <Calendar className="text-xl" />
                  <span>Tần suất nên ăn:</span>
                </Label>
                <span>{food?.frequency}</span>
              </div>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Label className="text-primary flex items-center font-bold gap-1">
                  <FileHeart className="text-xl" />
                  <span>Lợi ích:</span>
                </Label>
                <span>{food?.benefits}</span>
              </div>

              <div className="flex flex-col gap-2 mb-2">
                <Label className="text-primary flex items-center font-bold gap-1">
                  <Heater className="text-xl" />
                  <span className="w-full">
                    Đối tượng nên tránh hoặc hạn chế:
                  </span>
                </Label>
                <div className="flex flex-col">
                  {food?.restrictions?.map((restriction, index) => (
                    <span key={index} className="capitalize">
                      - {restriction}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-2">
                <Label className="text-primary flex items-center font-bold gap-1">
                  <Book className="text-xl" />
                  <span>Lời khuyên:</span>
                </Label>
                <span>{food?.advice}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FoodInfoCard;
