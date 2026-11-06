import { createContext, useContext, useEffect, useState } from "react";
const storeContext = createContext();
const useStore = () => {
  let curr = useContext(storeContext);
  return curr;
};
const InitAuth = {
  isLogin: false,
  token: "",
  userName: "",
};
const StoreProvider = ({ children }) => {
  const storeData = (data) => {
    let str = JSON.stringify(data);
    sessionStorage.setItem("stub0007", str); 
  };
  const getData = () => {
    try {
      let str = sessionStorage.getItem("stub0007");
      let obj = JSON.parse(str);
      return obj;
    } catch {
      return null;
    }
  };
  const handleLogin = (data) => {
    setAuth({
      isLogin: true,
      token: data.token,
      userName: data.userName,
    });
  };
  const handleLogout = () => {
    setAuth(InitAuth);
  };

  const [auth, setAuth] = useState(getData() ? getData() : InitAuth);
  useEffect(() => {
    storeData(auth);
  }, [auth]);

  return (
    <storeContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </storeContext.Provider>
  );
};
export default useStore;
export { StoreProvider };