export type MealKey = 'breakfast' | 'lunch' | 'dinner'

export type Meal = {
  name: string
  ingredients: string[]
  steps: string[]
  note: string
}

export type PrepCategory = 'protein' | 'staple' | 'vegetable' | 'seasoning'

export type PrepGroups = Record<PrepCategory, string[]>

export type MealDay = {
  day: number
  phase: '快速启动期' | '16+8 轻断食期'
  fastingWindow: string
  isBufferDay?: boolean
  meals: Record<MealKey, Meal>
  todayTips: string[]
  tomorrowPrep: string[]
}

export const prepLabels: Record<PrepCategory, string> = {
  protein: '蛋白质',
  staple: '主食',
  vegetable: '蔬菜',
  seasoning: '调味品',
}

const cookingSteps: Record<string, string[]> = {
  '青椒鸡胸肉': [
    '鸡胸肉切片，用少量生抽和姜片腌 10 分钟。',
    '锅中少油，先炒鸡肉，再放青椒翻炒。',
    '不放重辣酱，出锅前少量盐调味。',
  ],
  '青椒瘦肉丝': [
    '瘦肉切丝，用少量生抽和淀粉抓匀。',
    '锅中少油快炒肉丝，再加青椒、木耳或胡萝卜。',
    '少盐少酱油，保持清淡微辣。',
  ],
  '青菜豆腐汤': [
    '豆腐切块，青菜洗净备用。',
    '清水煮开后放豆腐，再放青菜。',
    '少盐调味，不放番茄，不煮浓汤。',
  ],
  '冬瓜瘦肉汤': [
    '冬瓜切片，瘦肉切片备用。',
    '清水先煮冬瓜，变软后放瘦肉。',
    '少盐调味，不加浓汤宝或厚重调料。',
  ],
  '麻辣豆腐轻油版': [
    '豆腐切块后焯水，减少豆腥味。',
    '少油爆香姜蒜、小米辣或少量花椒。',
    '不用火锅底料，不做重油重辣版。',
  ],
}

const lightSteps = (name: string) => [
  `${name}的食材洗净切好，肉类可用少量生抽和姜片简单腌制。`,
  '锅中少油快炒或清煮，优先保留食材本味。',
  '少盐少酱油，辣味控制在清辣、微辣。',
]

const meal = (
  name: string,
  ingredients: string[],
  note: string,
  steps = lightSteps(name),
): Meal => ({
  name,
  ingredients,
  steps,
  note,
})

const baseTips = (endTime: string) => [
  '少油少盐，避免重口味刺激食欲。',
  `${endTime} 后不吃东西，可喝水或无糖茶。`,
  '饭后散步 20 分钟，晚上避免夜宵。',
]

export const mealPlan: MealDay[] = [
  {
    day: 1,
    phase: '快速启动期',
    fastingWindow: '9:30 / 13:30 / 18:30，19:00 后停止进食',
    meals: {
      breakfast: meal(
        '无糖咖啡 + 水煮蛋 1-2 个 + 红薯 + 黄瓜',
        ['无糖咖啡', '鸡蛋 1-2 个', '红薯一小块', '黄瓜'],
        '早餐保留咖啡和鸡蛋，不要空腹喝太浓的咖啡。',
        ['鸡蛋水煮 8-10 分钟。', '红薯蒸熟或空气炸锅加热。', '咖啡不加糖不加奶油，黄瓜直接切条。'],
      ),
      lunch: meal(
        '青椒鸡胸肉 + 半碗米饭 + 西兰花',
        ['鸡胸肉', '青椒', '米饭半碗', '西兰花', '姜片'],
        '鸡胸肉不要煎到过干，米饭控制半碗。',
        cookingSteps['青椒鸡胸肉'],
      ),
      dinner: meal(
        '青菜豆腐汤 + 清炒娃娃菜',
        ['豆腐', '青菜', '娃娃菜', '蒜'],
        '晚餐以汤菜为主，别额外加夜宵。',
        cookingSteps['青菜豆腐汤'],
      ),
    },
    todayTips: baseTips('19:00'),
    tomorrowPrep: ['鸡蛋', '青椒', '瘦肉', '杂粮饭', '菌菇', '冬瓜'],
  },
  {
    day: 2,
    phase: '快速启动期',
    fastingWindow: '9:30 / 13:30 / 18:30，19:00 后停止进食',
    meals: {
      breakfast: meal(
        '无糖拿铁 + 鸡蛋蔬菜饼 + 黄瓜',
        ['无糖拿铁', '鸡蛋', '青菜碎', '少量燕麦粉', '黄瓜'],
        '拿铁不加糖，蔬菜饼少油小火煎。',
        ['鸡蛋打散，加入青菜碎和少量燕麦粉。', '不粘锅刷薄油，小火煎成饼。', '搭配黄瓜，控制酱料。'],
      ),
      lunch: meal(
        '青椒瘦肉丝 + 半碗杂粮饭 + 菌菇青菜',
        ['瘦猪肉', '青椒', '杂粮饭半碗', '菌菇', '青菜'],
        '瘦肉快炒即可，不做浓油赤酱。',
        cookingSteps['青椒瘦肉丝'],
      ),
      dinner: meal(
        '冬瓜瘦肉汤 + 小半碗饭',
        ['冬瓜', '瘦肉', '米饭小半碗', '姜片'],
        '汤要清，不要把晚餐拖到太晚。',
        cookingSteps['冬瓜瘦肉汤'],
      ),
    },
    todayTips: baseTips('19:00'),
    tomorrowPrep: ['鸡蛋', '无糖酸奶', '鸡肉', '油麦菜', '豆腐', '菌菇'],
  },
  {
    day: 3,
    phase: '快速启动期',
    fastingWindow: '9:30 / 13:30 / 18:30，19:00 后停止进食',
    meals: {
      breakfast: meal(
        '黑咖啡 + 鸡蛋 1 个 + 无糖酸奶',
        ['黑咖啡', '鸡蛋 1 个', '无糖酸奶'],
        '酸奶选择无糖款，咖啡不要空腹猛喝。',
        ['鸡蛋提前煮好。', '黑咖啡不加糖。', '无糖酸奶控制一小杯。'],
      ),
      lunch: meal(
        '辣椒炒鸡肉 + 半碗米饭 + 油麦菜',
        ['鸡肉', '青椒或小米辣少量', '米饭半碗', '油麦菜', '姜蒜'],
        '辣味用清辣，不使用辣椒油。',
      ),
      dinner: meal(
        '菌菇豆腐汤 + 青菜',
        ['菌菇', '豆腐', '青菜', '姜片'],
        '晚餐清淡，汤里不放番茄。',
        cookingSteps['青菜豆腐汤'],
      ),
    },
    todayTips: baseTips('19:00'),
    tomorrowPrep: ['鸡蛋', '玉米', '牛肉', '青椒', '西葫芦', '豆腐'],
  },
  {
    day: 4,
    phase: '快速启动期',
    fastingWindow: '9:30 / 13:30 / 18:30，19:00 后停止进食',
    meals: {
      breakfast: meal(
        '无糖咖啡 + 水煮蛋 + 玉米半根',
        ['无糖咖啡', '鸡蛋', '玉米半根'],
        '玉米半根即可，避免早餐主食过量。',
        ['鸡蛋水煮 8-10 分钟。', '玉米蒸熟或煮熟。', '咖啡不加糖不加奶油。'],
      ),
      lunch: meal(
        '青椒牛肉丝 + 半碗饭 + 西葫芦',
        ['瘦牛肉', '青椒', '米饭半碗', '西葫芦', '姜蒜'],
        '牛肉切细快炒，少油少盐。',
      ),
      dinner: meal(
        '麻辣豆腐轻油版 + 清炒青菜',
        ['豆腐', '青菜', '姜蒜', '小米辣少量', '花椒少量'],
        '只做轻油微辣，不使用火锅底料。',
        cookingSteps['麻辣豆腐轻油版'],
      ),
    },
    todayTips: baseTips('19:00'),
    tomorrowPrep: ['鸡蛋', '燕麦', '去皮鸡腿肉', '白萝卜', '瘦肉', '青菜'],
  },
  {
    day: 5,
    phase: '快速启动期',
    fastingWindow: '9:30 / 13:30 / 18:30，19:00 后停止进食',
    meals: {
      breakfast: meal(
        '黑咖啡 + 鸡蛋 1-2 个 + 燕麦少量',
        ['黑咖啡', '鸡蛋 1-2 个', '燕麦少量'],
        '启动期最后一天，继续稳住夜宵和甜饮。',
        ['鸡蛋煮熟或做少油滑蛋。', '燕麦用热水冲泡，不加糖。', '咖啡选择黑咖啡或无糖款。'],
      ),
      lunch: meal(
        '去皮鸡腿肉 + 半碗米饭 + 两份蔬菜',
        ['去皮鸡腿肉', '米饭半碗', '西兰花', '青菜', '姜蒜'],
        '鸡腿肉去皮，避免重油煎炸。',
      ),
      dinner: meal(
        '白萝卜瘦肉汤 + 青菜',
        ['白萝卜', '瘦肉', '青菜', '姜片'],
        '清汤少盐，晚饭后不再加餐。',
      ),
    },
    todayTips: baseTips('19:00'),
    tomorrowPrep: ['鸡蛋', '红薯', '鸡胸肉', '青椒', '豆腐', '冬瓜'],
  },
  {
    day: 6,
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    meals: {
      breakfast: meal('无糖咖啡 + 水煮蛋 + 红薯 + 黄瓜', ['无糖咖啡', '鸡蛋', '红薯', '黄瓜'], '第一餐放在 10:30，咖啡不加糖。'),
      lunch: meal('青椒鸡胸肉 + 半碗米饭 + 西兰花', ['鸡胸肉', '青椒', '米饭半碗', '西兰花'], '午餐吃够蛋白质，下午更稳。', cookingSteps['青椒鸡胸肉']),
      dinner: meal('青菜豆腐汤 + 小半碗饭', ['青菜', '豆腐', '米饭小半碗'], '18:00 左右吃完，18:30 后不进食。', cookingSteps['青菜豆腐汤']),
    },
    todayTips: baseTips('18:30'),
    tomorrowPrep: ['鸡蛋', '玉米', '瘦肉', '杂粮饭', '菌菇', '冬瓜'],
  },
  {
    day: 7,
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    isBufferDay: true,
    meals: {
      breakfast: meal('无糖拿铁 + 鸡蛋蔬菜饼 + 玉米半根', ['无糖拿铁', '鸡蛋', '青菜碎', '玉米半根'], '今天可作为 14+10 缓冲日，但不放开夜宵。'),
      lunch: meal('青椒瘦肉丝 + 杂粮饭 + 菌菇青菜', ['瘦猪肉', '青椒', '杂粮饭', '菌菇', '青菜'], '杂粮饭保持小半碗到半碗。', cookingSteps['青椒瘦肉丝']),
      dinner: meal('冬瓜瘦肉汤 + 青菜', ['冬瓜', '瘦肉', '青菜'], '晚餐清汤菜为主，不加主食也可以。', cookingSteps['冬瓜瘦肉汤']),
    },
    todayTips: ['14+10 缓冲日也要避开甜饮和夜宵。', '晚餐后只喝水或无糖茶。', '别因为缓冲日补偿性多吃。'],
    tomorrowPrep: ['鸡蛋', '无糖酸奶', '燕麦', '鸡肉', '油麦菜', '豆腐'],
  },
  {
    day: 8,
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    meals: {
      breakfast: meal('黑咖啡 + 鸡蛋 + 无糖酸奶 + 燕麦少量', ['黑咖啡', '鸡蛋', '无糖酸奶', '燕麦少量'], '燕麦少量即可，酸奶看配料表选无糖。'),
      lunch: meal('辣椒炒鸡肉 + 半碗饭 + 油麦菜', ['鸡肉', '青椒', '小米辣少量', '米饭半碗', '油麦菜'], '清辣即可，不加辣椒油。'),
      dinner: meal('菌菇豆腐汤 + 清炒娃娃菜', ['菌菇', '豆腐', '娃娃菜'], '晚餐不要做成浓汤。', cookingSteps['青菜豆腐汤']),
    },
    todayTips: baseTips('18:30'),
    tomorrowPrep: ['鸡蛋', '全麦面包', '牛肉', '青椒', '西葫芦', '豆腐'],
  },
  {
    day: 9,
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    meals: {
      breakfast: meal('无糖咖啡 + 水煮蛋 + 全麦面包少量', ['无糖咖啡', '鸡蛋', '全麦面包少量'], '全麦面包少量，避开甜面包。'),
      lunch: meal('青椒牛肉丝 + 半碗饭 + 西葫芦', ['瘦牛肉', '青椒', '米饭半碗', '西葫芦'], '牛肉少油快炒，别放重酱。'),
      dinner: meal('麻辣豆腐轻油版 + 青菜', ['豆腐', '青菜', '姜蒜', '小米辣少量'], '清辣轻油，吃完收口。', cookingSteps['麻辣豆腐轻油版']),
    },
    todayTips: baseTips('18:30'),
    tomorrowPrep: ['鸡蛋', '红薯', '去皮鸡腿肉', '西兰花', '白萝卜', '瘦肉'],
  },
  {
    day: 10,
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    meals: {
      breakfast: meal('黑咖啡 + 鸡蛋 + 红薯', ['黑咖啡', '鸡蛋', '红薯'], '红薯一小块，别用甜饮替代咖啡。'),
      lunch: meal('去皮鸡腿肉 + 半碗米饭 + 西兰花', ['去皮鸡腿肉', '米饭半碗', '西兰花'], '去皮鸡腿肉可煎可炒，少油。'),
      dinner: meal('白萝卜瘦肉汤 + 青菜', ['白萝卜', '瘦肉', '青菜'], '清汤少盐，晚间不加餐。'),
    },
    todayTips: baseTips('18:30'),
    tomorrowPrep: ['鸡蛋', '玉米', '鸡胸肉', '青椒', '娃娃菜', '豆腐'],
  },
]

const cycleDays: Omit<MealDay, 'day' | 'tomorrowPrep'>[] = [
  {
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    meals: {
      breakfast: meal('无糖咖啡 + 水煮蛋 + 玉米半根 + 黄瓜', ['无糖咖啡', '鸡蛋', '玉米半根', '黄瓜'], '咖啡保留，主食换成玉米保持新鲜感。'),
      lunch: meal('清辣青椒鸡胸肉 + 杂粮饭半碗 + 娃娃菜', ['鸡胸肉', '青椒', '杂粮饭半碗', '娃娃菜'], '清辣少油，饭量稳定。', cookingSteps['青椒鸡胸肉']),
      dinner: meal('豆腐青菜汤 + 凉拌黄瓜', ['豆腐', '青菜', '黄瓜', '蒜'], '晚餐轻一点，凉拌少盐少醋。', cookingSteps['青菜豆腐汤']),
    },
    todayTips: baseTips('18:30'),
  },
  {
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    isBufferDay: true,
    meals: {
      breakfast: meal('无糖拿铁 + 鸡蛋 + 燕麦小碗', ['无糖拿铁', '鸡蛋', '燕麦'], '14+10 缓冲日，窗口可稍微放宽但不吃夜宵。'),
      lunch: meal('青椒瘦肉丝 + 米饭半碗 + 西兰花', ['瘦猪肉', '青椒', '米饭半碗', '西兰花'], '瘦肉和蔬菜优先，主食不过量。', cookingSteps['青椒瘦肉丝']),
      dinner: meal('冬瓜菌菇瘦肉汤 + 青菜', ['冬瓜', '菌菇', '瘦肉', '青菜'], '清汤不加厚重调味。', cookingSteps['冬瓜瘦肉汤']),
    },
    todayTips: ['今天是 14+10 缓冲日，节奏放松但不放纵。', '避免奶茶、果汁和酒。', '晚餐后只喝水或无糖茶。'],
  },
  {
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    meals: {
      breakfast: meal('黑咖啡 + 鸡蛋蔬菜饼 + 黄瓜', ['黑咖啡', '鸡蛋', '青菜碎', '黄瓜'], '蔬菜饼少油，咖啡不加糖。'),
      lunch: meal('微辣鸡腿肉 + 红薯小块 + 油麦菜', ['去皮鸡腿肉', '红薯', '油麦菜', '姜蒜'], '鸡腿肉去皮，微辣即可。'),
      dinner: meal('菌菇豆腐汤 + 清炒青菜', ['菌菇', '豆腐', '青菜'], '不加番茄，不做浓汤。', cookingSteps['青菜豆腐汤']),
    },
    todayTips: baseTips('18:30'),
  },
  {
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    meals: {
      breakfast: meal('无糖咖啡 + 水煮蛋 + 全麦面包少量', ['无糖咖啡', '鸡蛋', '全麦面包少量'], '面包只留少量，别搭配果酱。'),
      lunch: meal('青椒牛肉丝 + 杂粮饭半碗 + 西葫芦', ['瘦牛肉', '青椒', '杂粮饭半碗', '西葫芦'], '牛肉快炒，保持少油清辣。'),
      dinner: meal('麻辣豆腐轻油版 + 娃娃菜', ['豆腐', '娃娃菜', '姜蒜', '花椒少量'], '轻油微麻，不用重豆瓣酱。', cookingSteps['麻辣豆腐轻油版']),
    },
    todayTips: baseTips('18:30'),
  },
  {
    phase: '16+8 轻断食期',
    fastingWindow: '10:30 - 18:30',
    meals: {
      breakfast: meal('黑咖啡 + 鸡蛋 + 玉米半根', ['黑咖啡', '鸡蛋', '玉米半根'], '主食小份，上午不喝含糖饮料。'),
      lunch: meal('去皮鸡腿肉 + 米饭半碗 + 双蔬菜', ['去皮鸡腿肉', '米饭半碗', '西兰花', '青菜'], '鸡腿肉少油煎或炒，蔬菜量要足。'),
      dinner: meal('白萝卜瘦肉汤 + 油麦菜', ['白萝卜', '瘦肉', '油麦菜'], '汤清淡，睡前不加餐。'),
    },
    todayTips: baseTips('18:30'),
  },
]

const prepCycle = [
  ['鸡蛋', '红薯', '鸡胸肉', '青椒', '豆腐', '青菜'],
  ['鸡蛋', '燕麦', '瘦肉', '西兰花', '冬瓜', '菌菇'],
  ['鸡蛋', '无糖酸奶', '去皮鸡腿肉', '油麦菜', '豆腐', '娃娃菜'],
  ['鸡蛋', '全麦面包', '瘦牛肉', '西葫芦', '青椒', '豆腐'],
  ['鸡蛋', '玉米', '瘦肉', '白萝卜', '青菜', '黄瓜'],
]

for (let day = 11; day <= 30; day += 1) {
  const template = cycleDays[(day - 11) % cycleDays.length]
  mealPlan.push({
    ...template,
    day,
    tomorrowPrep: prepCycle[(day - 11) % prepCycle.length],
  })
}

export const getPlanDay = (day: number) => mealPlan[day - 1]

