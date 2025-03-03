import { CalorieDisplay } from './CalorieDisplay'
import { useActivity } from '../hooks/useActivity'

export const CalorieTracker = () => {
  const { caloriesBurned, caloriesConsumed, netCalories } = useActivity()

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
