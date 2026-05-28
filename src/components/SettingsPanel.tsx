import { useState } from 'react'
import { toDateInputValue } from '../utils/date'

type SettingsPanelProps = {
  startDate: string | null
  onSave: (value: string) => void
  onReset: () => void
}

export function SettingsPanel({ startDate, onSave, onReset }: SettingsPanelProps) {
  const [value, setValue] = useState(startDate ?? toDateInputValue())
  const resetPlan = () => {
    setValue(toDateInputValue())
    onReset()
  }

  return (
    <div className="page-stack">
      <section className="section-title">
        <span className="eyebrow">开始日期</span>
        <h2>设置</h2>
        <p>设置计划第 1 天日期后，首页会按今天自动计算当前天数。</p>
      </section>

      <section className="settings-card">
        <label htmlFor="start-date">计划第 1 天日期</label>
        <input id="start-date" type="date" value={value} onChange={(event) => setValue(event.target.value)} />
        <button type="button" className="primary-button" onClick={() => onSave(value)}>
          开始计划
        </button>
        {startDate && (
          <button type="button" className="ghost-button" onClick={resetPlan}>
            一键重置 startDate
          </button>
        )}
      </section>

      <section className="preferences-card">
        <h3>饮食偏好与限制</h3>
        <ul>
          <li>保留早上咖啡和鸡蛋，咖啡默认无糖。</li>
          <li>可吃微辣、清辣，用青椒、姜蒜、小米辣或少量花椒。</li>
          <li>不安排海鲜、香菜、鱼腥草、番茄相关汤类。</li>
          <li>不安排酒、奶茶、果汁、油炸、重油重盐菜。</li>
          <li>第 6 天后默认 16+8，部分日期作为 14+10 缓冲日。</li>
        </ul>
      </section>
    </div>
  )
}
