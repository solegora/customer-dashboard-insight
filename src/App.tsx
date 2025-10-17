import React from 'react'
import { Provider } from 'react-redux'
import { store } from './services/store/store'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() { return <Provider store={store}><Dashboard /></Provider> }
export default App
