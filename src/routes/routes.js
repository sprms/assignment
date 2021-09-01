import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import LoginForm from '../components/Login/loginForm'
import Profile from '../components/Profile/index'
import ResetCodeIssue from '../components/Reset/resetCodeIssue'
import ResetCodeVerify from '../components/Reset/resetCodeVerify'
import ResetPassword from '../components/Reset/resetPassword'
import AuthRoute from './authRoute'
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { setAuthenticated, setUnAuthenticated } from '../action/authenticated'
import axios from 'axios';

const Routes = (props) => {
    useEffect(() => {
        let accessToken = localStorage.getItem("token");
        if(accessToken !== "null")
        {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            props.setAuthenticated();
        }
        
        else
        {
            axios.defaults.headers.common['Authorization'] = '';
            props.setUnAuthenticated();
        }
    }, []);

    return (
        <Router>
            <main>
            <Switch>
                <Route exact path="/" component={LoginForm} />
                <Route
                path="/login"
                render={props => (
                    <LoginForm {...props}/>
                )}
                />
                <Route
                path="/reset"
                render={props => (
                    <ResetCodeIssue {...props}/>
                )}
                />

                <Route
                path="/reset_verify"
                render={props => (
                    <ResetCodeVerify {...props}/>
                )}
                />

                <Route
                path="/reset_password"
                render={props => (
                    <ResetPassword {...props}/>
                )}
                />

                <AuthRoute
                authenticated={props.authenticated}
                path="/profile"
                render={props => <Profile {...props}/>}
                />
            </Switch>
            </main>
            </Router>

    )
}

const mapStateToProps = (state) => {
    return {
      authenticated: state.authenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setAuthenticated: () => dispatch(setAuthenticated()),
      setUnAuthenticated: () => dispatch(setUnAuthenticated()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);