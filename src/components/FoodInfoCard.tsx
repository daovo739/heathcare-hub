import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carrot, Clock, Calendar, Info } from 'lucide-react';

interface FoodInfo {
  name: string;
  calories: string;
  servingSize: string;
  mealSuggestions: {
    [key: string]: string[];
  };
  consumptionFrequency: string;
  benefits: string[];
  notes: string[];
}

interface FoodInfoCardProps {
  foodInfo: FoodInfo;
}

const FoodInfoCard: React.FC<FoodInfoCardProps> = ({ foodInfo }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-orange-50 to-yellow-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-orange-600 flex items-center">
          <Carrot className="w-8 h-8 mr-2" />
          Thông tin về {foodInfo.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-orange-500 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Thông tin chung
          </h3>
          <p>
            Một khẩu phần {foodInfo.name} ({foodInfo.servingSize}) chứa khoảng{' '}
            <span className="font-bold text-orange-600">
              {foodInfo.calories}
            </span>
            .
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-orange-500 mb-2 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Thời điểm ăn
          </h3>
          <p className="mb-2">
            {foodInfo.name} có thể được ăn{' '}
            <span className="font-bold text-orange-600">bất cứ lúc nào</span>{' '}
            trong ngày.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(foodInfo.mealSuggestions).map(
              ([mealTime, suggestions]) => (
                <div key={mealTime}>
                  <h4 className="font-semibold text-orange-400">{mealTime}:</h4>
                  <ul className="list-disc list-inside">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-orange-500 mb-2 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Tần suất ăn
          </h3>
          <p>
            Tần suất ăn {foodInfo.name} hợp lý cho một chế độ dinh dưỡng lành
            mạnh là{' '}
            <span className="font-bold text-orange-600">
              {foodInfo.consumptionFrequency}
            </span>
            .
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-orange-500 mb-2">
            Lợi ích và lưu ý
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {foodInfo.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
            {foodInfo.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodInfoCard;
