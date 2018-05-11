import React from "react";
import PropTypes from "prop-types";
// import property from "lodash/property";
import { validateInputs, notBlank } from "./signupform_validations";

const inputField = [
  {
    id: 'username',
    placeholder: 'User Name',
    type: 'text'
  },
  {
    id: 'password',
    placeholder: 'Password',
    type: 'password'
  },
  {
    id: 'confirmpassword',
    placeholder: 'Confirm Password',
    type: 'password'
  },
  {
    id: 'companyname',
    placeholder: 'Company Name',
    type: 'text'
  },
  {
    id: 'subdomain',
    placeholder: 'Sub Domain',
    type: 'text'
  },
  {
    id: 'email',
    placeholder: 'Email Address',
    type: 'text'
  },
  {
    id: 'mobilenumber',
    placeholder: 'Mobile Number',
    type: 'tel'
  },
];

function submitForm(companies) {
  let message;
  const signupDiv = document.getElementById('signupdiv');
  const inputElements = signupDiv.getElementsByTagName('input');
  const addressValue = signupDiv.getElementsByTagName('textarea')[0].value;
  let companyData = {
    username: inputElements[0].value,
    password: inputElements[1].value,
    company_name: inputElements[3].value,
    subdomain: inputElements[4].value,
    email: inputElements[5].value,
    mobile_number: inputElements[6].value,
    address: addressValue,
  };
  message = validateInputs('all', companyData, companies);
  return { companyData, message };
}
function Signup(props) {
  let errorMessage;
  return (
    <div id="signupdiv">
      <div className="font-style-class signup" >
        <div className="heading text-center">Sign UP</div>
          {inputField.map(input => {
            return(<div key={input.id}>
              <div className="form-display"><input
              id={input.id}
              placeholder={input.placeholder}
              type={input.type}
              onChange={(event) => {
                errorMessage = validateInputs(event.target.id, event.target.value, props.companies);
                event.target.className = errorMessage === "valid" ? 'green-border' : 'red-border';
                let errorElement = document.getElementById(`error_${input.id}`);
                errorMessage !== 'valid' ?
                  errorElement.innerHTML = errorMessage :
                  errorElement.innerHTML = '';
                }}
              onBlur={() => {
                if(input.id === 'password' || input.id === 'confirmpassword') {
                  // errorMessage = validateInputs('password', document.getElementById('password').value, props.companies);
                  const otherinputId = input.id === 'password' ? 'confirmpassword' : 'password';
                  document.getElementById(otherinputId).className = errorMessage === "valid" ? 'green-border' : 'red-border';
                }
                }}
              />
              </div>
              <div id={`error_${input.id}`} className={'form-display'} />
            </div>)
          })}
        <div>
          <div className={'form-display'}>
            <textarea id={'address'} placeholder="Address" type="text" onChange={(event) => {
             let errorElement = document.getElementById('error_address');
             errorMessage = notBlank(event.target.value) ? 'Please give a valid address' : 'valid';
             event.target.className = errorMessage === "valid" ? 'green-border' : 'red-border';
             errorMessage !== 'valid' ?
               errorElement.innerHTML = errorMessage :
               errorElement.innerHTML = '';
            }} />
          </div>
          <div id={'error_address'} className={'form-display'} />
        </div>
        {errorMessage !== 'valid' ?  errorMessage : ''}
        <div>
          <button
            className="purple-gradient"
            name="submit"
            type="submit"
            onClick={() => {
              const { companyData, message } = submitForm(props.companies);
              if(message === 'valid') {
                props.createCompany(companyData);
              }
            }}
           >Submit</button>
        </div>
      </div>
  	</div>
  );
}

Signup.propTypes = {
  companies: PropTypes.array.isRequired
};

export default Signup;
