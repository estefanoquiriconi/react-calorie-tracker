import { useMemo } from 'react'
import type { Activity } from '../types'
import { CalorieDisplay } from './CalorieDisplay'

type CalorieTrackerProps = {
  activities: Activity[]
}

export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
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

  return (
    <>
      <h2 className='text-4xl font-black text-white text-center'>
        Resumen de calorías
      </h2>

      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
        <CalorieDisplay
          label='Consumidas'
          calories={caloriesConsumed}
        />
        <CalorieDisplay
          label='Quemadas'
          calories={caloriesBurned}
        />
        <CalorieDisplay
          label='Diferencia'
          calories={netCalories}
        />
      </div>
    </>
  )
}
