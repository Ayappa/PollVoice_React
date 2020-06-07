import React, {  useContext, useEffect } from "react";
import UserContext from "../context/User_Context/UserContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const RegisterRedirect = (props) => {
	const userContext = useContext(UserContext);
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("[token]");
	const history = useHistory();

	useEffect(() => {		
		
		userContext.setToken(props.match.params.token);
       setCookie("token", props.match.params.token, { path: "/" });
       console.log(cookies.token)
		history.push("/"); window.location.reload(); 
	}, []);
	return <div></div>;
};

export default RegisterRedirect;
