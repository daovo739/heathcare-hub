export const generatePromptFromUser = (userInput: string) => {
  return `
    Bạn là một chuyên gia về dinh dưỡng. Dựa trên thông tin dưới đây, hãy tính toán lượng kcal của từng món ăn và trả về kết quả theo định dạng JSON.

    Input:${userInput}

    Yêu cầu:
    - Trích xuất tên món ăn, số lượng (nếu có), đơn vị (nếu có) và thời gian bữa ăn (sáng, trưa, tối, phụ).
    - Tính lượng kcal dựa trên món ăn.
    - Nếu không có số lượng, giả định là 1 khẩu phần ăn.
    - Trả về dưới dạng JSON với cấu trúc:
    [
    {
        "mealTime": "Bữa sáng",
        "dish": "phở bò",
        "quantity": 2,
        "unit": "tô",
        "calories": 500
    },
    {
        "mealTime": "Bữa trưa",
        "dish": "bánh xèo",
        "quantity": 1,
        "unit": "cái",
        "calories": 300
    }
    ]

    nếu không có số lượng hãy để 1
    hãy luôn trả về 1 array kể cả có là 1 phần tử hoặc không có phần tử nào
    nếu không có thời gian bữa ăn thì hãy để là Bữa phụ
    mealTime bao gồm các option 
    [
    'Bữa sáng',
    'Bữa trưa',
    'Bữa tối',
    'Bữa phụ',
    'Ăn vặt',
    ]. Vui lòng đúng chính tả và viết hoa viết thường
    Đừng thêm \`\`\`json\`\`\` trước và sau kết quả trả về.
    `.trim();
};
