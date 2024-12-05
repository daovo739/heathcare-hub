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

export function restructureAIResponse(response: string): FoodInfo {
  const lines = response.split('\n');
  const foodInfo: FoodInfo = {
    name: '',
    calories: '',
    servingSize: '',
    mealSuggestions: {},
    consumptionFrequency: '',
    benefits: [],
    notes: [],
  };

  let currentSection = '';

  lines.forEach((line) => {
    if (line.startsWith('Thực phẩm trong ảnh là')) {
      foodInfo.name = line.split('**')[1];
    } else if (line.includes('khẩu phần') && line.includes('kcal')) {
      const parts = line.split('**');
      foodInfo.servingSize = parts[1].trim();
      foodInfo.calories = parts[3].trim();
    } else if (
      line.includes('Sáng:') ||
      line.includes('Trưa:') ||
      line.includes('Tối:') ||
      line.includes('Ăn nhẹ:')
    ) {
      currentSection = line.split(':')[0].trim();
      foodInfo.mealSuggestions[currentSection] = [];
    } else if (line.startsWith('*') && currentSection) {
      foodInfo.mealSuggestions[currentSection].push(
        line.replace('*', '').trim()
      );
    } else if (line.includes('Tần suất ăn')) {
      foodInfo.consumptionFrequency = line
        .split('là')[1]
        .trim()
        .replace(/\*\*/g, '');
    } else if (line.startsWith('Việc ăn')) {
      foodInfo.benefits.push(line.trim());
    } else if (line.startsWith('Lưu ý')) {
      foodInfo.notes.push(line.trim());
    }
  });

  return foodInfo;
}
