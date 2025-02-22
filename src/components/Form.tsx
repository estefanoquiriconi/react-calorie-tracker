import { useState } from 'react'
import type { ActionDispatch, ChangeEvent, FormEvent } from 'react'
import type { Activity } from '../types'

import { categories } from '../data/categories'
import { ActivityActions } from '../reducers/activityReducer'

type FormProps = {
  dispatch: ActionDispatch<[action: ActivityActions]>
}

export const Form = ({ dispatch }: FormProps) => {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: '',
    calories: 0,
  })

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

    dispatch({ type: 'save-activity', payload: { newActivity: activity } })
  }

  return (
    <form
      className='space-y-5 bg-white shadow p-10 rounded-lg'
      onSubmit={handleSubmit}>
      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='category'
          className='font-bold'>
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
          className='font-bold'>
          Actividad:{' '}
        </label>

        <input
          id='name'
          type='text'
          className='border border-slate-300 py-2 rounded-lg'
          placeholder='Ej. Almuerzo, Judo de Naranja, Ensalada, Pesas, Ejercicio, Bicicleta'
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='calories'
          className='font-bold'>
          Calorías:{' '}
        </label>

        <input
          id='calories'
          type='number'
          className='border border-slate-300 py-2 rounded-lg'
          placeholder='Calorías. ej. 400 o 500'
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-default'
        value={`Guardar ${activity.category === 1 ? 'Comida' : 'Ejercicio'}`}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
