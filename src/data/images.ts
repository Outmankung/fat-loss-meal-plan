import beefImage from '../assets/food/beef-zucchini.jpg'
import breakfastImage from '../assets/food/breakfast-coffee-egg.jpg'
import chickenImage from '../assets/food/chicken-green-pepper.jpg'
import chickenThighImage from '../assets/food/chicken-thigh-vegetables.jpg'
import eggPancakeImage from '../assets/food/egg-vegetable-pancake.jpg'
import leanPorkImage from '../assets/food/lean-pork-green-pepper.jpg'
import lightMalaTofuImage from '../assets/food/light-mala-tofu.jpg'
import mushroomTofuSoupImage from '../assets/food/mushroom-tofu-soup.jpg'
import prepImage from '../assets/food/prep-ingredients.jpg'
import radishPorkSoupImage from '../assets/food/radish-pork-soup.jpg'
import spicyChickenImage from '../assets/food/spicy-chicken-greens.jpg'
import tofuSoupImage from '../assets/food/tofu-greens-soup.jpg'
import winterSoupImage from '../assets/food/winter-melon-pork-soup.jpg'
import yogurtOatImage from '../assets/food/yogurt-oat-breakfast.jpg'

export const foodImages = {
  beef: beefImage,
  breakfast: breakfastImage,
  chicken: chickenImage,
  chickenThigh: chickenThighImage,
  eggPancake: eggPancakeImage,
  leanPork: leanPorkImage,
  lightMalaTofu: lightMalaTofuImage,
  mushroomTofuSoup: mushroomTofuSoupImage,
  prep: prepImage,
  radishPorkSoup: radishPorkSoupImage,
  spicyChicken: spicyChickenImage,
  tofuSoup: tofuSoupImage,
  winterSoup: winterSoupImage,
  yogurtOat: yogurtOatImage,
}

export const getMealImage = (mealName: string) => {
  if (mealName.includes('鸡蛋蔬菜饼')) return foodImages.eggPancake
  if (mealName.includes('酸奶') || mealName.includes('燕麦小碗')) return foodImages.yogurtOat
  if (mealName.includes('牛肉')) return foodImages.beef
  if (mealName.includes('白萝卜')) return foodImages.radishPorkSoup
  if (mealName.includes('冬瓜') || mealName.includes('白萝卜')) return foodImages.winterSoup
  if (mealName.includes('麻辣豆腐')) return foodImages.lightMalaTofu
  if (mealName.includes('菌菇豆腐')) return foodImages.mushroomTofuSoup
  if (mealName.includes('豆腐')) return foodImages.tofuSoup
  if (mealName.includes('去皮鸡腿肉') || mealName.includes('鸡腿肉')) return foodImages.chickenThigh
  if (mealName.includes('辣椒炒鸡肉') || mealName.includes('微辣鸡腿肉')) return foodImages.spicyChicken
  if (mealName.includes('瘦肉丝')) return foodImages.leanPork
  if (mealName.includes('鸡')) return foodImages.chicken
  return foodImages.breakfast
}
