import { useState } from 'react'
import { mealPlan, type MealDay } from '../data/mealPlan'
import { getMealImage } from '../data/images'
import { formatMonthDay, getPlanDate } from '../utils/date'
import { MealCard } from './MealCard'

type PlanListProps = {
  startDate: string | null
  currentDisplayDay: number
}

export function PlanList({ startDate, currentDisplayDay }: PlanListProps) {
  const [selectedDayNumber, setSelectedDayNumber] = useState(currentDisplayDay)
  const detail = mealPlan[selectedDayNumber - 1]

  const dateLabel = startDate ? formatMonthDay(getPlanDate(startDate, detail.day)) : '未设置日期'

  return (
    <div className="page-stack">
      <section className="section-title">
        <span className="eyebrow">30 天安排</span>
        <h2>全部计划</h2>
        <p>点选天数后直接查看当天三餐，不用在长列表里来回找。</p>
      </section>

      <section className="day-picker" aria-label="选择计划天数">
        <div className="day-picker__header">
          <strong>选择天数</strong>
          <span>当前第 {currentDisplayDay} 天</span>
        </div>
        <div className="day-grid">
          {mealPlan.map((day) => {
            const isSelected = day.day === selectedDayNumber
            const isCurrent = day.day === currentDisplayDay
            return (
              <button
                type="button"
                className={[
                  'day-chip',
                  isSelected ? 'day-chip--selected' : '',
                  isCurrent ? 'day-chip--current' : '',
                  day.isBufferDay ? 'day-chip--buffer' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={day.day}
                onClick={() => setSelectedDayNumber(day.day)}
                aria-pressed={isSelected}
              >
                <span>{day.day}</span>
                {isCurrent && <small>今天</small>}
                {day.isBufferDay && !isCurrent && <small>缓冲</small>}
              </button>
            )
          })}
        </div>
      </section>

      <section className="selected-plan">
        <img className="selected-plan__image" src={getMealImage(detail.meals.lunch.name)} alt={detail.meals.lunch.name} />
        <div className="selected-plan__content">
          <span className="eyebrow">已选日期</span>
          <h3>
            第 {detail.day} 天
            <em>{dateLabel}</em>
          </h3>
          <p>
            {detail.phase}
            {detail.isBufferDay ? ' · 14+10 缓冲日' : ''} · {detail.fastingWindow}
          </p>
        </div>
      </section>

      <section className="meal-summary-grid" aria-label="当天餐食摘要">
        {(Object.entries(detail.meals) as Array<[keyof MealDay['meals'], MealDay['meals'][keyof MealDay['meals']]]>).map(
          ([key, meal]) => (
            <div className="meal-summary" key={key}>
              <span>{key === 'breakfast' ? '早餐' : key === 'lunch' ? '午餐' : '晚餐'}</span>
              <strong>{meal.name}</strong>
            </div>
          ),
        )}
      </section>

      <section className="detail-panel">
        <div className="detail-panel__header">
          <span className="eyebrow">当天详情</span>
          <h3>怎么吃 / 怎么做</h3>
        </div>
        <MealCard type="breakfast" meal={detail.meals.breakfast} />
        <MealCard type="lunch" meal={detail.meals.lunch} />
        <MealCard type="dinner" meal={detail.meals.dinner} />
      </section>

      <details className="compact-plan-list">
        <summary>展开 30 天文字总览</summary>
        <div className="plan-list">
        {mealPlan.map((day) => {
          const isCurrent = day.day === currentDisplayDay
          return (
            <button
              type="button"
              className={`plan-row ${isCurrent ? 'plan-row--active' : ''}`}
              key={day.day}
              onClick={() => setSelectedDayNumber(day.day)}
            >
              <img className="plan-row__image" src={getMealImage(day.meals.lunch.name)} alt={day.meals.lunch.name} loading="lazy" />
              <span className="plan-row__day">第 {day.day} 天</span>
              <span className="plan-row__body">
                <strong>
                  {startDate ? formatMonthDay(getPlanDate(startDate, day.day)) : '未设置日期'} · {day.phase}
                  {day.isBufferDay ? ' · 14+10 缓冲日' : ''}
                </strong>
                <small>
                  {day.meals.breakfast.name} / {day.meals.lunch.name} / {day.meals.dinner.name}
                </small>
              </span>
            </button>
          )
        })}
        </div>
      </details>
    </div>
  )
}
