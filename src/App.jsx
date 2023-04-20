import { AuthContext, useAuth } from "./context/AuthContext";

function App() {
	const { userData } = useAuth();
	const [authData, setAuthData] = useState({
		token: userData.token,
		user: userData.user,
	});

	return (
		<div className="App">
			<AuthContext.Provider value={{ authData, setAuthData }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
