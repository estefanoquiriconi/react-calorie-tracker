import { ReactNode, useMemo, useReducer } from 'react'
import { activityReducer, initialState } from '../reducers/activityReducer'
import { ActivityContext } from './ActivityContext'
import { categories } from '../data/categories'
import { Activity } from '../types'

type ActivityProviderProps = {
  children: ReactNode
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  const { activities } = state

  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0,
      ),
    [activities],
  )

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0,
      ),
    [activities],
  )

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned],
  )

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

  const categoryName = (category: Activity['category']) =>
    categories.find((cat) => cat.id === category)?.name || ''

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesBurned,
        caloriesConsumed,
        netCalories,
        isEmptyActivities,
        categoryName,
      }}>
      {children}
    </ActivityContext.Provider>
  )
}
