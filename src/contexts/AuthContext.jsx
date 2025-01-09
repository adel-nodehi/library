import { createContext, useContext, useState } from "react";
import { server } from "../helper/server";

const authServer = server("http://localhost:8000/users");

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({});
  const isLoggedIn = loggedInUser?.username;

  async function handleSignup(username, password) {
    const allUsers = await authServer.getData();

    if (allUsers.find((user) => user.name === username))
      throw new Error("Username is Token");

    const newUser = await authServer.addData({ username, password });

    console.log(newUser);

    setLoggedInUser(newUser);
  }

  async function handleLogin(username, password) {
    const allUsers = await authServer.getData();

    const matchUser = allUsers.find((user) => user.name === username);

    // if user doesn't exist on
    if (matchUser === undefined) throw new Error("Username doesn't exist");

    // if user enter wrong password
    if (matchUser.password !== password) throw new Error("Incorrect password");

    setLoggedInUser(matchUser);
  }

  function handleLogout() {
    setLoggedInUser({});
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        isLoggedIn,
        onLogin: handleLogin,
        onSignup: handleSignup,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth can't be used outside AuthProvider");

  return context;
}
