import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const AuthContext = createContext();

const initialState = { isAuthenticated: false, token: null, user: null };

function reducer(state, action) {
  switch (action.type) {
    case "updateUser":
      return {
        ...state,
        user: { ...state.user, appointments: action.payload },
      };
    case "updateToken":
      return { ...state, isAuthenticated: true, token: action.payload };

    case "logout":
      return { ...state, isAuthenticated: false, token: null };
    default:
      throw new Error("Unknown action performed");
  }
}

function AuthProvider({ children }) {
  const [{ isAuthenticated, token, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function updateUser(data) {
    console.log("okasha");
    dispatch({ type: "updateUser", payload: data });
  }

  async function fetchUserData() {
    try {
      const res = await fetch(
        "https://hiring-test-task.vercel.app/api/appointments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      updateUser(data);
    } catch (error) {
      console.error(error.message);
      // console.log(`Error in getting data from server`);
    }
  }

  async function refreshToken() {
    try {
      const res = await fetch(
        "https://hiring-test-task.vercel.app/api/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data.newToken);

      dispatch({ type: "updateToken", payload: data.newToken });
    } catch (error) {
      console.log(`Error in getting data from server`);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        dispatch,
        logout,
        updateUser,
        user,
        refreshToken,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("Auth context is used out of its provider");
  }
  return context;
}
export { AuthProvider, useAuth };
