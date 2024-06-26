import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAppSelector } from './hooks';

function App() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user? <Navigate to="/" />: <Login />} />
        <Route path="/signup" element={user? <Navigate to="/" /> : <SignUp />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
