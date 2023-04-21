import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext({});

export const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	let navigate = useNavigate();

	const [userData, setUserData] = useState({
		token: "",
		user: null,
	});

	const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);

	const getAuthCookieExpiration = () => {
		let date = new Date();
		date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
		return date;
	};

	const setAsLogged = (user, token) => {
		setCookie("auth_token", token, {
			path: "/",
			expires: getAuthCookieExpiration(),
			sameSite: "lax",
			httpOnly: false,
		});
		setUserData({ token: token, user });
		navigate("/");
	};

	const setLogout = () => {
		removeCookie("auth_token", {
			path: "/",
			expires: getAuthCookieExpiration(),
			sameSite: "lax",
			httpOnly: false,
		});
		setUserData({ token: "", user: null });
		navigate("/login");
	};

	const loginUserOnStartup = () => {
		console.log(cookies);
		if (cookies["auth_token"]) {
			fetch(`${BACKEND_URL}/api/user`, {
				headers: {
					Authorization: `Bearer ${cookies["auth_token"]}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setUserData({ token: cookies["auth_token"], user: data.user });
					navigate("/");
				})
				.catch((error) => {
					console.log(error);
					setUserData({ token: "", user: null });
					setLogout();
				});
		} else {
			setUserData({ token: "", user: null });
			navigate("/login");
		}
	};

	function updateOptions(options) {
		const update = {
			...options,
			headers: { ...options.headers, Accept: "application/json" },
		};
		if (userData.token) {
			update.headers = {
				...update.headers,
				Authorization: `Bearer ${userData.token}`,
			};
		}
		return update;
	}

	const fetcher = (url, options) => {
		return fetch(url, updateOptions(options));
	};

	return (
		<AuthContext.Provider
			value={{
				userData,
				setAsLogged,
				setLogout,
				loginUserOnStartup,
				fetcher,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
