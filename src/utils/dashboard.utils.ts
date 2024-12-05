import { SurveyData } from '@/contexts/AppContext';

export function generateDashboardPrompt(data: SurveyData): string {
  const { goals, personalInfo, medicalHistory } = data;

  // Convert height from cm to m
  const heightInMeters = (parseFloat(personalInfo.height) / 100).toFixed(2);

  // Format medical conditions
  const medicalConditions =
    medicalHistory?.conditions?.join(', ') || 'Không có';
  const otherCondition = medicalHistory?.otherCondition
    ? `, ${medicalHistory.otherCondition}`
    : '';

  // Generate the prompt
  const prompt = `
Chào bạn, Tôi hiện tại Cao ${heightInMeters}m Nặng ${
    personalInfo.weight
  }kg Tuổi: ${personalInfo.age} Giới tính: ${
    personalInfo.gender === 'male'
      ? 'Nam'
      : personalInfo.gender === 'female'
      ? 'Nữ'
      : 'Khác'
  }
Tiểu sử bệnh lý: ${medicalConditions}${otherCondition}
Môi trường: Làm ngành IT cho nên cần tiếp xúc máy tính nhiều ở văn phòng và ở nhà, ít vận động
Mục tiêu của tôi: ${goals.join(', ')}
Thời hạn mong muốn đạt mục tiêu: 1 tháng
Dựa trên những thông tin trên Hãy đưa cho tôi kế hoạch chi tiết giúp tôi, bao gồm số năng lượng cần tiêu hao, thời gian trong ngày nên ăn bữa. Hãy cho tôi lời khuyên khi tôi thực hiện một hoạt động mới
Khi tôi cập nhật các hoạt động của tôi, bạn hãy luôn luôn cập nhật status Collection giúp tôi nhé!
Chỉ đưa ra format JSON mà tôi có thể sử dụng JSON.parse() từ Javascript, không cần thông tin khác
energy: {
  caloIn: number,
  caloTarget: number,
  date: Date
},
// Dựa vào thông tin cá nhân và mục tiêu của tôi và đưa ra đánh giá
status: {
  name: string, // bộ câu trả lời nên nằm trong [Tốt, Cảnh báo, Nghiêm trọng]
  level: number, // bộ câu trả lời nên nằm trong [1, 2, 3]
  situation: string
},
mealSchedule: {
  mealType: string,
  time: string,
  advice: string
}
  đừng bọc json trong \`\`\`json\n\`\`\`
`.trim();

  return prompt;
}
