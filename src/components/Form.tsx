import { useState, useEffect } from 'react'
import { v4 as uuid4 } from 'uuid'
import type { ActionDispatch, ChangeEvent, FormEvent } from 'react'
import type { Activity } from '../types'
import type {
  ActivityState,
  ActivityActions,
} from '../reducers/activityReducer'

import { categories } from '../data/categories'

type FormProps = {
  state: ActivityState
  dispatch: ActionDispatch<[action: ActivityActions]>
}

const initialState: Activity = {
  id: uuid4(),
  category: 1,
  name: '',
  calories: 0,
}

export const Form = ({ state, dispatch }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (activity) => activity.id === state.activeId,
      )[0]
      setActivity(selectedActivity)
    }
  }, [state.activities, state.activeId])

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: 'SAVE_ACTIVITY', payload: { newActivity: activity } })

    setActivity({
      ...initialState,
      id: uuid4(),
    })
  }

  return (
    <form
      className='space-y-5 bg-white shadow p-10 rounded-lg'
      onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='category'
          className='text-sm font-bold text-gray-700'>
          Categoría:{' '}
        </label>
        <select
          id='category'
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          value={activity.category}
          onChange={handleChange}>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='name'
          className='text-sm font-bold text-gray-700'>
          Actividad:{' '}
        </label>

        <input
          id='name'
          type='text'
          className='border border-slate-300 p-2 rounded-lg'
          placeholder={
            activity.category === 1
              ? 'Ej. Almuerzo, Jugo de Naranja, Ensalada'
              : 'Ej. Pesas, Ejercicio, Bicicleta'
          }
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='calories'
          className='text-sm font-bold text-gray-700'>
          Calorías:{' '}
        </label>

        <input
          id='calories'
          type='number'
          className='border border-slate-300 p-2 rounded-lg'
          placeholder='Calorías. ej. 400 o 500'
          value={activity.calories !== 0 ? activity.calories : ''}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed'
        value={`Guardar ${activity.category === 1 ? 'Comida' : 'Ejercicio'}`}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
