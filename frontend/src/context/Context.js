import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: null || JSON.parse(localStorage.getItem("user")), // bec initially there will be no user without login process
  isFetching: false,
  error: false,
};

// so after the login process if everything is successful, we're gonna update this initial state
// we will have our username, email & we're gonna reach this user inside any component, any pages

export const Context = createContext(INITIAL_STATE);
// inside this Context im gonna pass the initial state

// So how am i gonna reach this user inside any component? i should create here ContextProvider
// And wrap all the components with the ContextProvider & then we'll be able to reach this initial state

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  // so once this initial state is updated we can now use this Context as Provider by Context.Provider

  // PAGE REFRESH KARNE PE USER CHALA na jaye uske liye(filhal localStorage use karra hu) -
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]); // whenever this changes fire this useEffect

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
