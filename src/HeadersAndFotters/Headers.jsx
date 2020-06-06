import React, { useContext } from "react";
import logo from "../question.png";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useCookies } from "react-cookie";
import PollContext from "../context/Poll_Context/PollContext";

const Header = () => {
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");
	const pollContext = useContext(PollContext);
	const { CreateText } = pollContext;
	const onChange = (e) => {
		pollContext.searchTextFunction(e.target.value);
	};
	return (
		<nav className='navbar navbar-expand-lg navbar-light flex-sm-row bg-light'>
			<div className='navbar-collapse '>
				<img src={logo} alt='icon' />
				{(cookies.token === null || cookies.token === "") && (
					<span className='font-weight-bold'>Polls</span>
				)}
				{cookies.token !== "" && (
					<ul className='navbar-nav  mr-auto'>
						<li className='nav-item '>
							<Link className='nav-link' to='/'>
								<span className='font-weight-bold'>Polls</span>
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/my_polls'>
								<span className='font-weight-bold'> My Poll</span>
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/answered_polls'>
								<span className='font-weight-bold'> Answered Poll</span>
							</Link>
						</li>

						<li className='nav-item'>
							<Link className='nav-link' to='/createPoll'>
								<span className='font-weight-bold'> Create Poll</span>
							</Link>
						</li>
					</ul>
				)}
				{cookies.token === "" && (
					<>
						<Link className='nav-link' to='/login'>
							<span className='font-weight-bold '> Login</span>
						</Link>
						<Link className='nav-link' to='/register'>
							<span className='font-weight-bold'> Register</span>
						</Link>
					</>
				)}
				{cookies.token !== "" && (
					<>
						{!CreateText && (
							<input
								type='text'
								className='form-control'
								id='CreateText'
								placeholder='search poll'
								name='CreateText'
								onChange={onChange}
								style={{ width: "300px", height: "30px", paddingTop: "5px" }}
							/>
						)}

						<Link className='nav-link ' to='/logout'>
							<span className='font-weight-bold'> Logout</span>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default withRouter(Header);
