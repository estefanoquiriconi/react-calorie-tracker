import { Activity } from '../types'

export type ActivityActions =
  | { type: 'SAVE_ACTIVITY'; payload: { newActivity: Activity } }
  | { type: 'SET_ACTIVE_ID'; payload: { id: Activity['id'] } }
  | { type: 'DELETE_ACTIVITY'; payload: { id: Activity['id'] } }
  | { type: 'RESTART_APP' }

export type ActivityState = {
  activities: Activity[]
  activeId: Activity['id'] | ''
}

const getStoredActivities = (): Activity[] => {
  try {
    const storedData = localStorage.getItem('activities')
    if (!storedData) return []

    const parsedData = JSON.parse(storedData)
    return Array.isArray(parsedData) ? (parsedData as Activity[]) : []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const initialState: ActivityState = {
  activities: getStoredActivities(),
  activeId: '',
}

const updateActivity = (
  activities: Activity[],
  activeId: string,
  newActivity: Activity,
): Activity[] => {
  return activities.map((activity) =>
    activity.id === activeId ? newActivity : activity,
  )
}

const addActivity = (
  activities: Activity[],
  newActivity: Activity,
): Activity[] => {
  return [...activities, newActivity]
}

const deleteActivity = (activities: Activity[], id: string): Activity[] => {
  return activities.filter((activity) => activity.id !== id)
}

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions,
): ActivityState => {
  switch (action.type) {
    case 'SAVE_ACTIVITY':
      return {
        ...state,
        activities: state.activeId
          ? updateActivity(
              state.activities,
              state.activeId,
              action.payload.newActivity,
            )
          : addActivity(state.activities, action.payload.newActivity),
        activeId: '',
      }

    case 'SET_ACTIVE_ID':
      return {
        ...state,
        activeId: action.payload.id,
      }

    case 'DELETE_ACTIVITY':
      return {
        ...state,
        activities: deleteActivity(state.activities, action.payload.id),
        activeId: state.activeId === action.payload.id ? '' : state.activeId,
      }

    case 'RESTART_APP':
      return {
        activities: [],
        activeId: '',
      }

    default:
      return state
  }
}
