import { useAuthContext } from "../../auth/AuthProvider";

const Home = () => {
  const { user } = useAuthContext();
  return <div>Home: {user.email}</div>;
};

export default Home;
