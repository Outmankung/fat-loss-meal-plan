import type { Meal, MealKey } from '../data/mealPlan'
import { getMealImage } from '../data/images'

const mealTitle: Record<MealKey, string> = {
  breakfast: '早餐 / 第一餐',
  lunch: '午餐',
  dinner: '晚餐',
}

type MealCardProps = {
  type: MealKey
  meal: Meal
}

export function MealCard({ type, meal }: MealCardProps) {
  const image = getMealImage(meal.name)

  return (
    <article className="meal-card">
      <img className="meal-card__image" src={image} alt={meal.name} loading="lazy" />

      <div className="meal-card__header">
        <span>{mealTitle[type]}</span>
        <strong>{meal.name}</strong>
      </div>

      <section>
        <h4>食材</h4>
        <div className="chip-row">
          {meal.ingredients.map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h4>基础做法</h4>
        <ol className="steps">
          {meal.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <p className="meal-note">{meal.note}</p>
    </article>
  )
}
