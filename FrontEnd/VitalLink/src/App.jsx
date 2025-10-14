import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpForm from './components/SignInForm'
import VitalLinkHomepage from './components/VitalLinkHomepage'
import DonorRegistrationForm from './components/DonorRegistrationForm'
import HospitalDashboard from './components/HospitalDashboard'
import DonorDashboard from './components/DonorDashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <SignUpForm/>
      <DonorRegistrationForm/> */}
      <VitalLinkHomepage/>
      {/* <DonorDashboard/> */}
     
    </>
  )
}

export default App
