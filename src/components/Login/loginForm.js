import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import {apiLogin} from '../../services/auth';
import { connect } from 'react-redux'
import { setAuthenticated } from '../../action/authenticated'

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    apiLogin(
      {
        email: email,
        password: password,
      },
      
      {
        success: (response) => {
          const { accessToken } = response.data;
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          localStorage.setItem("token", accessToken);
          props.setAuthenticated();
        },

        error: (error) => {
          if (error.response) {
            alert(error.response.data.error.message);
          }

          else if(error.request) {
            console.log(error.request);
          }

          else
            console.log('Error', error.message);
        }
      }
    );
  };

  if (props.authenticated) return <Redirect to="/profile" />;

  return (
    <>
      <h1>Login</h1>
      <div>
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        placeholder="email"
      />
      </div>
      <div>
      <input
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
        placeholder="password"
      />
      </div>
      <button onClick={handleClick}>Login</button>

      <div>
        <button onClick={() => { props.history.push('/reset')}}>Reset Password</button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated: () => dispatch(setAuthenticated())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);