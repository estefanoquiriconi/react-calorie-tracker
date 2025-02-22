type CalorieDisplayProps = {
  label: string
  calories: number
}

export const CalorieDisplay = ({ label, calories }: CalorieDisplayProps) => {
  return (
    <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
      <span className='font-black text-6xl text-orange-50'>{calories}</span>
      {label}
    </p>
  )
}
