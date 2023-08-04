import { useSelector } from "react-redux";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector((state)=> state.slice.isLoggedIn)
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector((state)=> state.slice.isLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;