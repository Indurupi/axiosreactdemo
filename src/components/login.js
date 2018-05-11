import React from "react";
import PropTypes from "prop-types";
import { notBlank } from './signupform_validations';

function Login(props) {
  let errorMessage;
  return (
    <div className="font-style-class login col-md-6 col-md-push-4">
      <div className="heading text-center">Login</div>
      <div className="form-display"><input id="loginuser" placeholder="Username" type="text" /></div>
      <div className="form-display"><input id="loginpassword" placeholder="Password" type="text" /></div>
      <div>
        <button
          type="submit"
          className="purple-gradient button-style width-100"
          onClick={() => {
            const username = document.getElementById('loginuser').value;
            const password = document.getElementById('loginpassword').value;
            if(!notBlank(username) && !notBlank(password)) {
              props.login({ username, password });
            } else {
              errorMessage = 'Enter both username and password field to login';
              document.getElementById('login-error').innerHTML = errorMessage;
            }
          }}
        >
          Login
        </button>
        <div id={'login-error'} />
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default Login;
