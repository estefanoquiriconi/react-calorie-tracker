import { ActionDispatch, createContext } from 'react'
import { ActivityActions, ActivityState } from '../reducers/activityReducer'
import { Activity } from '../types'

type ActivityContextProps = {
  state: ActivityState
  dispatch: ActionDispatch<[action: ActivityActions]>
  caloriesConsumed: number
  caloriesBurned: number
  netCalories: number
  isEmptyActivities: boolean
  categoryName: (category: Activity['category']) => string
}

export const ActivityContext = createContext<ActivityContextProps | null>(null)
