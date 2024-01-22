import axios from 'axios'
import { useEffect, useState } from 'react'

export default {
  title: 'API',
}

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '4e024169-0fcb-4c25-aa1d-c6adfa882144',
  },
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    axios
      .get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    axios
      .post(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        { title: 'movies' },
        settings
      )
      .then((res) => {
        setState(res.data)
      })
  }, [])
}

export const DeleteTodolists = () => {}

export const UpdateTodolists = () => {}
