import Navbar from "./components/Navbar.jsx"
import {Routes,Route} from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from './pages/SignUpPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import LogInPage  from './pages/LogInPage.jsx'
function App() {

  return (
    <>
   <Navbar/>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/login" element={<LogInPage/>}/>
  <Route path="/signup" element={<SignUpPage/>}/>
  <Route path="/setting" element={<SettingPage/>}/>
  <Route path="/profile" element={<ProfilePage/>}/>
</Routes>
    </>
  )
}

export default App
