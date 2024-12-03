import { Carrot, ChefHat, Croissant, Vegan, Wheat, Wine } from 'lucide-react'

export const exclusions = [
  {
    category: 'Loại trừ phổ biến',
    items: [
      'Gluten',
      'Đậu phộng',
      'Trứng',
      'Cá',
      'Hạt cây',
      'Sữa',
      'Đậu nành',
      'Hải sản',
    ],
  },
  {
    category: 'Các loại trừ khác',
    subcategories: [
      {
        name: 'Sữa',
        items: ['Sữa', 'Kem', 'Phô mai', 'Sữa chua', 'Phô mai tươi'],
      },
      {
        name: 'Trứng',
        items: ['Trứng'],
      },
      {
        name: 'Ngũ cốc',
        items: [
          'Ngũ cốc',
          'Ngũ cốc ăn sáng',
          'Mì ống',
          'Bánh mì',
          'Gạo',
          'Yến mạch',
          'Đường',
        ],
      },
      {
        name: 'Đậu nành',
        items: ['Đậu nành', 'Đậu phụ', 'Sữa đậu nành'],
      },
      {
        name: 'Thịt đỏ',
        items: ['Thịt đỏ', 'Thịt bò', 'Thịt heo/Bacon', 'Thịt cừu', 'Thịt bê'],
      },
      {
        name: 'Gia cầm',
        items: ['Gia cầm', 'Gà', 'Gà tây'],
      },
      {
        name: 'Cá',
        items: [
          'Cá',
          'Cá hồi',
          'Cá ngừ',
          'Cá rô phi',
          'Cá mòi',
          'Cá hồi nâu & cá hồng',
        ],
      },
      {
        name: 'Hải sản',
        items: ['Hải sản'],
      },
      {
        name: 'Mayonnaise',
        items: ['Mayonnaise'],
      },
      {
        name: 'Chất béo & hạt',
        items: [
          'Chất béo & hạt',
          'Bơ',
          'Đậu phộng',
          'Hạnh nhân',
          'Óc chó',
          'Hạt hồ đào',
        ],
      },
      {
        name: 'Các loại đậu',
        items: ['Các loại đậu', 'Đậu', 'Đậu lăng', 'Đậu hà lan'],
      },
      {
        name: 'Trái cây',
        items: [
          'Trái cây',
          'Táo',
          'Chuối',
          'Nho',
          'Cam',
          'Dâu tây',
          'Mâm xôi',
          'Việt quất',
          'Nước ép trái cây',
        ],
      },
      {
        name: 'Rau củ',
        items: [
          'Rau củ',
          'Atisô',
          'Măng tây',
          'Củ dền',
          'Bông cải xanh',
          'Cà rốt',
          'Mầm cải',
          'Cần tây',
          'Ớt',
          'Cà chua',
          'Cà tím',
        ],
      },
      {
        name: 'Rau củ giàu tinh bột',
        items: ['Rau củ giàu tinh bột', 'Khoai tây & khoai mỡ', 'Ngô'],
      },
      {
        name: 'Mật ong',
        items: ['Mật ong'],
      },
    ],
  },
]

export const dietOptions = [
  {
    id: 'anything',
    name: 'Bất kỳ',
    description: 'Không loại trừ gì',
    excludes: [],
    Icon: ChefHat,
    iconColor: '#FFCFEF',
  },
  {
    id: 'keto',
    name: 'Keto',
    description:
      'Loại trừ: Các loại đậu, rau củ nhiều tinh bột, ngũ cốc giàu carb',
    excludes: ['Các loại đậu', 'Rau củ nhiều tinh bột', 'Ngũ cốc giàu carb'],
    Icon: Wheat,
    iconColor: '#FADA7A',
  },
  {
    id: 'mediterranean',
    name: 'Địa Trung Hải',
    description: 'Loại trừ: Thịt đỏ, nước ép trái cây, rau củ nhiều tinh bột',
    excludes: ['Thịt đỏ', 'Nước ép trái cây', 'Rau củ nhiều tinh bột'],
    Icon: Wine,
    iconColor: '#AB4459',
  },
  {
    id: 'paleo',
    name: 'Ăn kiêng',
    description:
      'Loại trừ: Sữa, ngũ cốc, các loại đậu, đậu nành, rau củ nhiều tinh bột',
    excludes: [
      'Sữa',
      'Ngũ cốc',
      'Các loại đậu',
      'Đậu nành',
      'Rau củ nhiều tinh bột',
    ],
    Icon: Carrot,
    iconColor: '#E38E49',
  },
  {
    id: 'vegan',
    name: 'Thuần chay',
    description:
      'Loại trừ: Thịt đỏ, gia cầm, cá, hải sản, sữa, trứng, sốt mayonnaise, mật ong',
    excludes: [
      'Thịt đỏ',
      'Gia cầm',
      'Cá',
      'Hải sản',
      'Sữa',
      'Trứng',
      'Sốt mayonnaise',
      'Mật ong',
    ],
    Icon: Vegan,
    iconColor: '#9ABF80',
  },
  {
    id: 'vegetarian',
    name: 'Chay',
    description: 'Loại trừ: Thịt đỏ, gia cầm, cá, hải sản',
    excludes: ['Thịt đỏ', 'Gia cầm', 'Cá', 'Hải sản'],
    Icon: Croissant,
    iconColor: '#D3F1DF',
  },
]
