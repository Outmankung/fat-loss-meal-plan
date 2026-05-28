import { MealCard } from './MealCard'
import { PrepList } from './PrepList'
import { foodImages, getMealImage } from '../data/images'
import type { MealDay } from '../data/mealPlan'
import type { PlanDateState } from '../utils/date'
import { getTomorrowPrep } from '../utils/ingredients'

type TodayCardProps = {
  day: MealDay
  planState: PlanDateState
  onTabChange: (tab: 'plan' | 'prep' | 'settings') => void
}

export function TodayCard({ day, planState, onTabChange }: TodayCardProps) {
  const title =
    planState.status === 'not-started'
      ? '计划未开始'
      : planState.status === 'maintenance'
        ? '维持期'
        : `第 ${day.day} 天`

  return (
    <div className="today-stack">
      <section className="hero-card">
        <div>
          <span className="eyebrow">今日计划</span>
          <h1>{title}</h1>
          <p>
            {planState.status === 'not-started'
              ? '开始日期还没到，先预览第 1 天安排。'
              : planState.status === 'maintenance'
                ? '已完成 30 天计划，当前进入维持期。建议继续使用 16+8 循环菜单。'
                : `今天是计划第 ${planState.dayIndex} 天。`}
          </p>
        </div>
        <div className="phase-pill">
          <span>{planState.status === 'maintenance' ? '维持期' : day.phase}</span>
          <strong>{day.fastingWindow}</strong>
        </div>
        <div className="hero-gallery" aria-hidden="true">
          <img src={getMealImage(day.meals.breakfast.name)} alt="" />
          <img src={getMealImage(day.meals.lunch.name)} alt="" />
          <img src={getMealImage(day.meals.dinner.name)} alt="" />
        </div>
      </section>

      {day.isBufferDay && <div className="notice">今天是 14+10 缓冲日，放松节奏但不放开夜宵。</div>}

      <div className="action-row">
        <button type="button" onClick={() => onTabChange('plan')}>
          查看全部计划
        </button>
        <button type="button" onClick={() => onTabChange('prep')}>
          查看明日备菜
        </button>
        <button type="button" onClick={() => onTabChange('settings')}>
          修改开始日期
        </button>
      </div>

      <MealCard type="breakfast" meal={day.meals.breakfast} />
      <MealCard type="lunch" meal={day.meals.lunch} />
      <MealCard type="dinner" meal={day.meals.dinner} />

      <section className="tips-card">
        <h3>今日提醒</h3>
        <ul>
          {day.todayTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <PrepList title="明日备菜清单" items={getTomorrowPrep(day)} image={foodImages.prep} />
    </div>
  )
}
