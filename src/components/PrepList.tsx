import { prepLabels, type PrepGroups } from '../data/mealPlan'
import { groupIngredients } from '../utils/ingredients'

type PrepListProps = {
  title: string
  items: string[]
  compact?: boolean
  image?: string
}

export function PrepList({ title, items, compact = false, image }: PrepListProps) {
  const groups = groupIngredients(items)

  return (
    <section className={`prep-card ${compact ? 'prep-card--compact' : ''}`}>
      {image && <img className="prep-card__image" src={image} alt={title} loading="lazy" />}
      <h3>{title}</h3>
      {(Object.keys(groups) as Array<keyof PrepGroups>).map((key) => {
        const groupItems = groups[key]
        if (groupItems.length === 0) return null

        return (
          <div className="prep-group" key={key}>
            <span>{prepLabels[key]}</span>
            <div className="chip-row">
              {groupItems.map((item) => (
                <span className="chip chip--plain" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
