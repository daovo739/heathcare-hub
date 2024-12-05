export interface MealAnalysis {
  name: string;
  suggestedTimes: string[]; // Ví dụ: ["Trưa", "Tối"]
  reason: string;
  frequency: string; // Ví dụ: "1-2 lần/tuần"
  restrictions: string[]; // Đối tượng nên tránh
  advice: string; // Lời khuyên
  benefits: string;
}

export function parseMealSections(text: string) {
  const sections = text.split('\n\n').map((section) => section.trim());
  const meals: Record<string, unknown>[] = [];

  for (const section of sections) {
    const lines = section.split('\n').map((line) => line.trim());
    const mealData: Record<string, unknown> = {};

    for (const line of lines) {
      if (line.startsWith('**') && line.endsWith('**')) {
        // Tên món ăn
        mealData.name = line.replace(/\*\*/g, '').trim();
      } else if (line.startsWith('- Thời điểm nên ăn:')) {
        mealData.suggestedTimes = line
          .replace('- Thời điểm nên ăn:', '')
          .trim()
          .split(',')
          .map((time) => time.trim());
      } else if (line.startsWith('- Lợi ích:')) {
        mealData.benefits = line.replace('- Lợi ích:', '').trim();
      } else if (line.startsWith('- Tần suất gợi ý:')) {
        mealData.frequency = line.replace('- Tần suất gợi ý:', '').trim();
      } else if (line.startsWith('- Đối tượng nên hạn chế hoặc tránh:')) {
        mealData.restrictions = line
          .replace('- Đối tượng nên hạn chế hoặc tránh:', '')
          .trim()
          .split(',')
          .map((restriction) => restriction.trim());
      } else if (line.startsWith('- Lời khuyên hoặc thay thế:')) {
        mealData.advice = line
          .replace('- Lời khuyên hoặc thay thế:', '')
          .trim();
      }
    }

    if (Object.keys(mealData).length > 0) {
      meals.push(mealData);
    }
  }

  return meals as unknown as MealAnalysis[];
}
