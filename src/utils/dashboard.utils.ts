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
Dựa trên những thông tin trên Hãy đưa cho tôi kế hoạch chi tiết giúp tôi, bao gồm số năng lượng cần tiêu hao, thời gian trong ngày nên ăn bữa. Hãy cho tôi lời khuyên khi tôi thực hiện một hoạt động mới
Khi tôi cập nhật các hoạt động của tôi, bạn hãy luôn luôn cập nhật status Collection giúp tôi nhé!
Chỉ đưa ra format JSON mà tôi có thể sử dụng JSON.parse() từ Javascript, không cần thông tin khác
energy: {
  caloIn: number,
  caloTarget: number
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
Nếu các thông tin về tuổi tác, chiều cao, cân nặng, mục tiêu và tiền sử bệnh lí không tồn tại thì hãy cảnh báo người dùng cần nhập đầy đủ thông tin trước khi muốn xem đánh giá và status.situation nên trả về "Vui lòng nhập đầy đủ thông tin về tuổi tác, chiều cao, cân nặng, mục tiêu và tiền sử bệnh lý để đánh giá.", status.name nên trả về "Cảnh báo", status.level nên trả về 2. Nếu các thông tin đã được nhập lại, thì hãy trả về kết quả theo như đánh giá của bạn.
`.trim();

  return prompt;
}

export const fallBackGeneralHealthData = {
  energy: {
    caloIn: 1800,
    caloTarget: 2000,
  },
  status: {
    name: 'Cảnh báo',
    level: 2,
    situation:
      'Lượng calo nạp vào thấp hơn mục tiêu, bạn nên tăng khẩu phần ăn hoặc thêm bữa nhẹ.',
  },
  mealSchedule: {
    mealType: 'Bữa trưa',
    time: '12:30',
    advice: 'Nên bổ sung protein và rau xanh để cân bằng dinh dưỡng.',
  },
};
