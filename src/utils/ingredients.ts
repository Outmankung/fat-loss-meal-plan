import { mealPlan, type MealDay, type PrepGroups } from '../data/mealPlan'

const seasoningWords = ['姜', '蒜', '花椒', '小米辣', '青椒']
const stapleWords = ['饭', '红薯', '玉米', '燕麦', '面包']
const proteinWords = ['鸡蛋', '鸡胸肉', '鸡肉', '鸡腿肉', '瘦肉', '牛肉', '豆腐', '豆干', '酸奶']

export const groupIngredients = (items: string[]): PrepGroups => {
  const groups: PrepGroups = {
    protein: [],
    staple: [],
    vegetable: [],
    seasoning: [],
  }

  items.forEach((item) => {
    if (seasoningWords.some((word) => item.includes(word)) && !item.includes('青椒')) {
      groups.seasoning.push(item)
    } else if (proteinWords.some((word) => item.includes(word))) {
      groups.protein.push(item)
    } else if (stapleWords.some((word) => item.includes(word))) {
      groups.staple.push(item)
    } else {
      groups.vegetable.push(item)
    }
  })

  return groups
}

export const getTodayIngredients = (day: MealDay) => {
  const ingredients = Object.values(day.meals).flatMap((meal) => meal.ingredients)
  return [...new Set(ingredients)]
}

export const getTomorrowPrep = (day: MealDay) =>
  day.day === 30 ? mealPlan[5].tomorrowPrep : day.tomorrowPrep

