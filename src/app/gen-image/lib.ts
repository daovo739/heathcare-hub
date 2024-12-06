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
  const meals: MealAnalysis[] = [];

  for (const section of sections) {
    const lines = section.split('\n').map((line) => line.trim());
    const mealData: Partial<MealAnalysis> = {};

    for (const line of lines) {
      if (/^\*\*.*\*\*$/.test(line)) {
        // Tên món ăn
        mealData.name = line.replace(/^\*\*(.*?)\*\*$/, '$1').trim();
      } else if (/^- Thời điểm nên ăn.*?/i.test(line)) {
        // Thời điểm ăn
        mealData.suggestedTimes = line
          .replace(/^- Thời điểm nên ăn.*?/i, '')
          .trim()
          .split(',')
          .map((time) => time.trim());
      } else if (/^- Lợi ích.*?:/i.test(line)) {
        // Lợi ích
        mealData.benefits = line.replace(/^- Lợi ích:/i, '').trim();
      } else if (/^- Tần suất.*:/i.test(line)) {
        // Tần suất
        mealData.frequency = line.replace(/^- Tần suất.*?:/i, '').trim();
      } else if (/^- Đối tượng nên hạn chế hoặc tránh:/i.test(line)) {
        // Đối tượng nên hạn chế
        mealData.restrictions = line
          .replace(/^- Đối tượng nên hạn chế hoặc tránh.*?:/i, '')
          .trim()
          .split(',')
          .map((restriction) => restriction.trim());
      } else if (/^- Lời khuyên.*?:/i.test(line)) {
        // Lời khuyên
        mealData.advice = line.replace(/^- Lời khuyên.*?:/i, '').trim();
      }
    }

    if (Object.keys(mealData).length > 0) {
      meals.push(mealData as MealAnalysis);
    }
  }

  return meals;
}
