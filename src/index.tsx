import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { todolists, tasks } from './data/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App initTodolists={todolists} initTasks={tasks} />)