import { useMemo, useState } from 'react'
import './App.css'
import { PlanList } from './components/PlanList'
import { PrepList } from './components/PrepList'
import { SettingsPanel } from './components/SettingsPanel'
import { TodayCard } from './components/TodayCard'
import { foodImages } from './data/images'
import { mealPlan } from './data/mealPlan'
import { calculatePlanState } from './utils/date'
import { getTodayIngredients, getTomorrowPrep } from './utils/ingredients'

type Tab = 'today' | 'plan' | 'prep' | 'settings'

const storageKey = 'fat-loss-plan-start-date'

const readStartDate = () => localStorage.getItem(storageKey)

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('today')
  const [startDate, setStartDate] = useState<string | null>(() => readStartDate())
  const planState = useMemo(() => calculatePlanState(startDate), [startDate])
  const currentDay = mealPlan[planState.displayDay - 1]

  const saveStartDate = (value: string) => {
    localStorage.setItem(storageKey, value)
    setStartDate(value)
    setActiveTab('today')
  }

  const resetStartDate = () => {
    localStorage.removeItem(storageKey)
    setStartDate(null)
    setActiveTab('settings')
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <strong className="brand-mark">FitPlan</strong>
        <div>
          <span className="eyebrow">减脂食谱计划</span>
          <h1>今天吃什么</h1>
        </div>
        <span className="status-dot">{startDate ? '已设置' : '未开始'}</span>
      </header>

      {!startDate && activeTab === 'today' ? (
        <section className="empty-card">
          <span className="eyebrow">先设置开始日期</span>
          <h2>让计划按日期自动运行</h2>
          <p>设置计划第 1 天日期后，首页会自动显示今天是第几天，以及今天吃什么、怎么做、明天备什么。</p>
          <button type="button" className="primary-button" onClick={() => setActiveTab('settings')}>
            设置开始日期
          </button>
        </section>
      ) : (
        <>
          {activeTab === 'today' && (
            <TodayCard day={currentDay} planState={planState} onTabChange={(tab) => setActiveTab(tab)} />
          )}
          {activeTab === 'plan' && <PlanList startDate={startDate} currentDisplayDay={planState.displayDay} />}
          {activeTab === 'prep' && (
            <div className="page-stack">
              <section className="section-title">
                <span className="eyebrow">备菜</span>
                <h2>今天和明天要准备什么</h2>
              </section>
              <PrepList title="今天需要用到的食材" items={getTodayIngredients(currentDay)} image={foodImages.prep} />
              <PrepList title="明天需要提前准备" items={getTomorrowPrep(currentDay)} image={foodImages.prep} />
            </div>
          )}
          {activeTab === 'settings' && (
            <SettingsPanel startDate={startDate} onSave={saveStartDate} onReset={resetStartDate} />
          )}
        </>
      )}

      <nav className="tab-bar" aria-label="主导航">
        {[
          ['today', '今日'],
          ['plan', '全部计划'],
          ['prep', '备菜'],
          ['settings', '设置'],
        ].map(([key, label]) => (
          <button
            type="button"
            className={activeTab === key ? 'active' : ''}
            key={key}
            onClick={() => setActiveTab(key as Tab)}
          >
            {label}
          </button>
        ))}
      </nav>
    </main>
  )
}

export default App
