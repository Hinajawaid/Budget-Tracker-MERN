import './App.css'
import BudgetPage from './pages/BudgetPage';
import SignIn from './pages/SignIn';

import { Route, Routes, BrowserRouter, } from 'react-router-dom';

import SignUp from './pages/SignUp';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/dashboard" element={<BudgetPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App