// import seperateDatas from './seperate_data.js';

const numberPattern = new RegExp(/^[0-9]{10,15}$/);
const emailPattern = new RegExp(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/);
const subdomainPattern = new RegExp(/^[A-Za-z0-9]{1,10}$/);
const passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

export function notBlank(value) {
  return value.trim().length === 0;
}

function usernameValidate(value, usernameArray) {
  let message;
  if(notBlank(value)) {
    message = 'Username must not be blank';
  } else if(usernameArray.filter(c => c === value).length > 0){
    message = 'Username is already taken';
  } else {
    message = 'valid';
  }
  return message;
};

function companyNameValidate(value) {
  let message;
  if(notBlank(value)) {
    message = 'Company Name must not be blank';
  } else {
    message = 'valid';
  }
  return message;
};

function subdomainValidate(value, subdomainArray) {
  let message;
  if(notBlank(value)) {
    message = 'Sub Domain must not be blank';
  } else if(!(subdomainPattern.test(value))) {
    message = 'Sub Domain must contain letters and numbers only';
  } else if(subdomainArray.filter(c => c === value).length > 0){
    message = 'Sub Domain is already taken';
  } else {
    message = 'valid';
  }
  return message;
};

function emailValidate(value, emailArray) {
  let message;
  if(notBlank(value)) {
    message = 'Email must not be blank';
  } else if(!(emailPattern.test(value))) {
    message = 'Please enter a valid email address';
  } else if(emailArray.filter(c => c === value).length > 0){
    message = 'Email is already taken';
  } else {
    message = 'valid';
  }
  return message;
};

function mobilenumberValidate(value) {
  let message;
  if(notBlank(value)) {
    message = 'Mobile Number must not be blank';
  } else if(!(numberPattern.test(value))) {
    message = '10 - 15 numbers only';
  } else {
    message = 'valid';
  }
  return message;
};

function passwordValidate(value, inputId) {
  let message;
  const otherinputId = inputId === 'password' ? 'confirmpassword' : 'password';
  const otherValue = document.getElementById(otherinputId).value;
  if(notBlank(value)) {
    message = 'Password must not be blank';
  } else if(!(passwordPattern.test(value))) {
    message = 'min 8 charecters, at least 1 letter and 1 number';
  } else if(value !== otherValue) {
    message = 'Password and Confirm Password must match';
  } else {
    message = 'valid';
  }
  return message;
};

function seperateDatas(companies) {
  let usernameArray = [];
  let subdomainArray = [];
  let emailArray = [];

  for(let i = 0; i < companies.length; i += 1) {
    usernameArray.push(companies[i].username);
    subdomainArray.push(companies[i].subdomain);
    emailArray.push(companies[i].email);
  }
  return { usernameArray, subdomainArray, emailArray };
}

export function validateInputs(inputId, value, companies) {
  let message;
  let { usernameArray, subdomainArray, emailArray } = seperateDatas(companies);
 if(inputId === 'username') {
    message = usernameValidate(value, usernameArray);
  } else if(inputId === 'companyname') {
    message = companyNameValidate(value);
  } else if(inputId === 'subdomain') {
    message = subdomainValidate(value, subdomainArray);
  } else if(inputId === 'emailaddress') {
    message = emailValidate(value, emailArray);
  } else if(inputId === 'mobilenumber') {
    message = mobilenumberValidate(value);
  } else if(inputId === 'password' || inputId === 'confirmpassword') {
    message = passwordValidate(value, inputId);
  } else if(inputId === 'all') {
    let errorMessages = {
      username: usernameValidate(value.username, usernameArray),
      password: passwordValidate(value.password, inputId),
      confirmpassword: passwordValidate(value.password, inputId),
      companyname: companyNameValidate(value.company_name),
      subdomain: subdomainValidate(value.subdomain, subdomainArray),
      email: emailValidate(value.email, emailArray),
      mobilenumber: mobilenumberValidate(value.mobile_number),
      address: notBlank(value.address) ? 'Address must not be blank' : 'valid'
    }
    for (const [key, value] of Object.entries(errorMessages)) {
      if(value !== 'valid') {
        message = 'Please enter valid details';
        document.getElementById(key).className = 'red-border';
        document.getElementById(`error_${key}`).innerHTML = value;
      } else {
        message = 'valid';
      }
    }
  }
 return message;
}
