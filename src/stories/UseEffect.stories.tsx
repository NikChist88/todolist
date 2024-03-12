import { useEffect, useState } from 'react'

export default {
  title: 'ResetUseEffect',
}

export const ResetUseEffect = () => {
  const [counter, setCounter] = useState(1)

  console.log('Component rendered ' + counter)

  useEffect(() => {
    console.log('Effect occured ' + counter)

    return () => {
      console.log('Reset effect ' + counter)
    }
  }, [counter])

  const increaseCounter = () => {
    setCounter(counter + 1)
  }

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={increaseCounter}>inc</button>
    </>
  )
}
