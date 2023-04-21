import AuthProvider, { useAuth } from "./context/AuthProvider";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useEffect, useContext } from "react";

function App() {
	const { userData, loginUserOnStartup } = useAuth();

	useEffect(() => {
		loginUserOnStartup();
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen p-5">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
