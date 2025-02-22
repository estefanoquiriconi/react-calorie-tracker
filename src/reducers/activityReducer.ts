import { Activity } from '../types'

export type ActivityActions = {
  type: 'save-activity'
  payload: { newActivity: Activity }
}

type ActityState = {
  activities: Activity[]
}

export const initialState: ActityState = {
  activities: [],
}

export const actityReducer = (
  state: ActityState = initialState,
  action: ActivityActions,
) => {
  if (action.type === 'save-activity') {
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    }
  }
  return state
}
