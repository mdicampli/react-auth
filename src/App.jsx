import AuthProvider, { useAuth } from "./context/AuthProvider";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useEffect, useContext } from "react";

function App() {
	const { userData, loginUserOnStartup, setLogout } = useAuth();

	useEffect(() => {
		loginUserOnStartup();
	}, []);

	return (
		<>
			<nav className="bg-gray-100 border-gray-200 fixed top-0 left-0 right-0">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
					<a href="#" className="flex items-center">
						<span className="self-center text-2xl font-semibold whitespace-nowrap">ReactAuth</span>
					</a>
					<div className="flex items-center">
						{
							userData.token && 
							<button onClick={setLogout} className="text-sm  text-blue-600 hover:underline">Logout</button>
						}
					</div>
				</div>
			</nav>
			<div className="flex items-center justify-center min-h-screen p-5">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
