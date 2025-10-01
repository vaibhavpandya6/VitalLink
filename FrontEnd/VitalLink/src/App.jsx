import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpForm from './components/SignUpForm'
import VitalLinkHomepage from './components/vitallink-homepage-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <SignUpForm/> */}
      <VitalLinkHomepage/>
     
    </>
  )
}

export default App
