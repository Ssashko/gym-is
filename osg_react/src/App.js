import { Routes, Route } from 'react-router-dom';

import './App.css';

import RequireAuth from './components/RequireAuth';
import Profile from './pages/Profile';
import MainCTA from './pages/MainCTA';
import Coaches from './pages/Coaches';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Recovery from './pages/Auth/Recovery';
import FullCoach from './pages/FullCoach';

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainCTA />} />
			<Route path="/coaches" element={<Coaches />} />
			<Route path="/coaches/:id" element={<FullCoach />} />
			<Route path="/register" element={<Register />} />
			<Route path="/sign-in" element={<Login />} />
			<Route path="/password-recovery" element={<Recovery />} />

			<Route element={<RequireAuth />}>
				<Route path="/profile/*" element={<Profile />} />
			</Route>
		</Routes>
	);
}

export default App;
