import { useReducer, useEffect } from 'react'
import { Form } from './components/Form'
import { ActivityList } from './components/ActivityList'
import { CalorieTracker } from './components/CalorieTracker'
import { activityReducer, initialState } from './reducers/activityReducer'

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => state.activities.length > 0

  return (
    <>
      <header className='bg-gray-800 p-4'>
        <div className='gap-2 max-w-4xl mx-auto flex justify-between items-center'>
          <h1 className='text-center text-lg font-bold text-white uppercase'>
            Contador de Calorías
          </h1>
          <button
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'RESTART_APP' })}
            className='bg-lime-200 hover:bg-lime-300 p-2 font-bold uppercase text-black cursor-pointer rounded-lg text-sm disabled:opacity-30 disabled:cursor-not-allowed'>
            Reiniciar App
          </button>
        </div>
      </header>

      <section className='bg-lime-300 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
          <Form
            state={state}
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className='bg-gray-800 p-10 '>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
