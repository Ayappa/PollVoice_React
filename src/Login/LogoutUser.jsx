import React from "react";
import { useCookies } from "react-cookie";

const LogoutUser = () => {
	const [cookies, setCookie] = useCookies(['token']);
	console.log(cookies);
	setCookie("token","");
	return (
		<div>
			<h1 className='text-dark display-1 font-weight-normal paddingHeader'>
				Visit us again ...{" "}
			</h1>
		</div>
	);
};

export default LogoutUser;
