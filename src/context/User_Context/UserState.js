import React, { useReducer } from "react";
//import axios from "axios";
import UserReducer from "./UserReducer";
import UserContext from "./UserContext";
import Request from "../Model/Request";
import { useCookies } from "react-cookie";

const UserState = (props) => {
	const initialState = {
		token: "",
		userName: "",
	};

	// eslint-disable-next-line
	const [state, dispatch] = useReducer(UserReducer, initialState);
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");

	//login
	const login = (userDetails) => {
		return Request.loginUser(userDetails);
	};
	const setToken = (token) => {
		//createdPoll.rem
		//console.log(cookies);
		dispatch({ type: "setToken", payload: token });
	};
	const register = (userDetails) => {
		return Request.registerUser(userDetails);
	};
	const sendMail = (mail) => {
		return Request.sendMail(mail);
	};
	const updatePassword = (token,password) => {
		return Request.updatePassword(token,password);
	};

	return (
		<UserContext.Provider
			value={{
				token: state.token,
				userName: state.userName,
				login,
				sendMail,
				updatePassword,
				register,
				setToken,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
