import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";

const Home = () => {
	const { userData } = useAuth();
	useEffect(() => console.log(userData), [userData]);
	return <>Bentornato, {userData?.user?.name}</>;
};

export default Home;
