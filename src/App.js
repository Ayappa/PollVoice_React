import React from "react";
import Polls from "./PollComponents/Polls";
import Header from "./HeadersAndFotters/Headers";
import Fotter from "./HeadersAndFotters/Footer";
import Login from "./Login/LoginUser";
import Register from "./Login/RegisterUser";
import Logout from "./Login/LogoutUser";
import MyPolls from "./PollComponents/MyPolls";
import GetPoll from "./PollComponents/GetPoll";
import AnsweredPolls from "./PollComponents/AnsweredPoll";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePoll from "./PollComponents/CreatePoll";
import PollState from "./context/Poll_Context/PollState";
import UserState from "../src/context/User_Context/UserState";
import { CookiesProvider } from 'react-cookie';
import RegisterRedirect from "./Login/RegisteredRedirect"
import ForgotPassword from "./Login/ForgotPassword"
import RedirectForgetPassword from "./Login/RedirectForgetPassword"
const App = (prop) => {
	return (
    <CookiesProvider>
		<PollState>
			<UserState>
				<Router>
					<div className='App'>
						<Header />
						<Switch>
						    <Route exact path='/forgotPassword' component={ForgotPassword} />
							<Route exact path='/updatePasswordMail/:token' component={RedirectForgetPassword} />
							<Route exact path='/sendRegisterMail/:token' component={RegisterRedirect} />
							<Route exact path='/' component={Polls} />
							<Route path='/my_polls' component={MyPolls} />
							<Route path='/answered_polls' component={AnsweredPolls} />
							<Route path='/login' component={Login} />
							<Route path='/register' component={Register} />
							<Route path='/logout' component={Logout} />
							<Route path='/createPoll' component={CreatePoll} />
							<Route path='/postQuestion/:id/getOne' component={GetPoll} />
						</Switch>
						<Fotter />
					</div>
				</Router>
			</UserState>
		</PollState>
    </CookiesProvider>
	);
};

export default App;
