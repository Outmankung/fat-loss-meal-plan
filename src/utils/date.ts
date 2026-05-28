const MS_PER_DAY = 24 * 60 * 60 * 1000

export type PlanStatus = 'not-set' | 'not-started' | 'active' | 'maintenance'

export type PlanDateState = {
  status: PlanStatus
  dayIndex: number | null
  displayDay: number
}

export const toDateInputValue = (date = new Date()) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const parseLocalDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const addDays = (value: string, days: number) => {
  const date = parseLocalDate(value)
  date.setDate(date.getDate() + days)
  return toDateInputValue(date)
}

export const formatMonthDay = (value: string) => {
  const date = parseLocalDate(value)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

export const getPlanDate = (startDate: string, day: number) => addDays(startDate, day - 1)

export const calculatePlanState = (
  startDate: string | null,
  today = new Date(),
): PlanDateState => {
  if (!startDate) {
    return { status: 'not-set', dayIndex: null, displayDay: 1 }
  }

  const start = parseLocalDate(startDate)
  const current = parseLocalDate(toDateInputValue(today))
  const dayIndex = Math.floor((current.getTime() - start.getTime()) / MS_PER_DAY) + 1

  if (dayIndex < 1) {
    return { status: 'not-started', dayIndex, displayDay: 1 }
  }

  if (dayIndex > 30) {
    const cycleDay = ((dayIndex - 6) % 25) + 6
    return { status: 'maintenance', dayIndex, displayDay: cycleDay }
  }

  return { status: 'active', dayIndex, displayDay: dayIndex }
}

