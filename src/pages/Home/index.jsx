import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";

const Home = () => {
	const { userData } = useAuth();
	return <>Bentornato, {userData?.user?.name}</>;
};

export default Home;
