import { CollectDataForm } from './CollectData';

export function generateNutritionPrompt(data: CollectDataForm) {
  return `
  Hãy tạo một kế hoạch dinh dưỡng cá nhân hóa dựa trên các thông tin sau:
  
  - Hoạt động: ${data.personalInfo.activity}
  - Tuổi: ${data.personalInfo.age}
  - Chiều cao: ${data.personalInfo.height} cm
  - Cân nặng: ${data.personalInfo.weight} kg
  - Giới tính: ${data.personalInfo.sex}
  - Lipid: ${data.personalInfo.lipid}
  - Mục tiêu: ${data.target.type}
  - Thay đổi cân nặng mỗi tuần: ${data.target.weightEachWeek} kg
  - Năng lượng: ${data.energyUnit}
  - Đơn vị đo lường: ${data.units}
  - Chế độ ăn ưa thích: ${data.favoriteDiet}
  - Loại thực phẩm loại trừ: ${
    data.exclude.length > 0 ? data.exclude.join(', ') : 'Không có'
  }
  
  Hãy cung cấp thông tin theo định dạng sau:

    **1. Số kcal cần thiết mỗi ngày**
    - Tổng số kcal: 2.500 kcal
    - Tỷ lệ dinh dưỡng cần thiết: 60% chất béo, 20% carb, 20% protein

    **2. Danh sách thực phẩm gợi ý**
    - Rau: 100-150g
    - Rau lá xanh: Cải bó xôi, cải xoăn

    **3. Lượng nước cần uống**
    - 3-4 lít nước mỗi ngày

    **4. Hoạt động thể chất cần thiết**
    - Loại hoạt động: Tập tạ
    - Thời gian thực hiện mỗi ngày: 60-90 phút

    **5. Ghi chú thêm**
    - Tránh sử dụng thực phẩm chế biến, đồ uống có đường và chất béo chuyển hóa.

    Cung cấp thông tin chi tiết và rõ ràng theo đúng định dạng trên..
    `.trim();
}

export function parseFormattedText(text: string) {
  const lines = text.split('\n').map((line) => line.trim());
  const data: { [key: string]: any } = {};
  let currentSection = null;
  let currentSubsection = null;

  for (const line of lines) {
    if (line.startsWith('**') && line.endsWith('**')) {
      // Xử lý tiêu đề section
      currentSection = line.replace(/\*\*/g, '').trim();
      data[currentSection] = [];
    } else if (line.startsWith('- ')) {
      // Xử lý các ý chính trong section
      const content = line.replace('- ', '').trim();
      if (currentSection) {
        currentSubsection = { title: content, details: [] };
        data[currentSection].push(currentSubsection);
      }
    } else if (line.startsWith('  - ')) {
      // Xử lý các mục chi tiết trong ý chính
      const detail = line.replace('  - ', '').trim();
      if (currentSubsection) {
        currentSubsection.details.push(detail as never);
      }
    }
  }

  return data;
}
