import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const AuthContext = createContext(null);

export const useAuth = () => {
	let navigate = useNavigate();

	const [userData, setUserData] = useState({
		token: "",
		user: null,
	});

	const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);

	const { setAuthData } = useContext(AuthContext);

	useEffect(() => {
		setAuthData(userData);
	}, [userData.token]);

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
		setUserData({ token: true, user });
		navigate("/");
	};

	const setLogout = () => {
		removeCookie("auth_token", {
			path: "/",
			expires: getAuthCookieExpiration(),
			sameSite: "lax",
			httpOnly: false,
		});
		setUserData({ token: false, user: null });
		navigate("/login");
	};

	const loginUserOnStartup = () => {
		if (cookies["auth_token"]) {
			fetch("/api/user", {
				headers: {
					Authorization: `Bearer ${cookies["auth_token"]}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setUserData({ token: true, user: data.user });
					navigate("/");
				})
				.catch((error) => {
					console.log(error);
					setUserData({ token: false, user: null });
					setLogout();
				});
		} else {
			setUserData({ token: false, user: null });
			navigate("/login");
		}
	};

	return {
		userData,
		setAsLogged,
		setLogout,
		loginUserOnStartup,
	};
};
