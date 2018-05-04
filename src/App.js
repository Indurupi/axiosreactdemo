import React, { Component } from "react";
import axios from "axios";


import CompanyList from "./components/company_list";

import Signup from './components/signup';
import Login from './components/login';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

class App extends Component {

  static jsonResponse(value) {
    return JSON.parse(JSON.stringify(value));
  }
  getCompanies() {
    axios
      .get("http://demoapi.nekhop.com/api/company/", {
  	headers: headers
  	})
      .then(response => {
        const newCompanies = App.jsonResponse(response.data.data);
        const data = newCompanies.map(c => {
          return {
            id:c.id,
            company_name:c.company_name,
            subdomain:c.subdomain,
            full_domain:c.full_domain,
            address:c.address,
            address_line_one:c.address_line_one,
            address_line_two:c.address_line_two,
            city:c.city,
            state:c.state,
            country:c.country,
            pincode:c.pincode,
            gst_id:c.gst_id,
            email:c.email,
            mobile_number:c.mobile_number,
            mobile_number_two:c.mobile_number_two,
            username:c.username,
            password:c.password,
            register_date:c.register_date,
            joined:c.joined,
            created_by:c.created_by
          };
        });
        const newState = Object.assign({}, this.state, {
          companies: data
        });

        this.setState(newState);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  createCompany(data) {
    const newCompany = JSON.stringify(data);
    axios.post("http://demoapi.nekhop.com/api/company/create",
    data: newCompany,
    {
    headers: headers,
    }).then(response => {
      console.log(App.jsonResponse(response.data.data));
      this.getCompanies();
    }).catch((error) => {
      console.log(error);
    });
  }
  login(data) {
    const credentials = JSON.stringify(data);
    axios.post("http://demoapi.nekhop.com/api/user/login",
    data: credentials,
    {
    headers: headers
    }).then(response => {
      const success = App.jsonResponse(response.data.success);
      const errorMessage = success ? 'Login Successfull' : 'Wrong credentials';
      document.getElementById('login-error').innerHTML = errorMessage;
    }).catch((error) => {
      console.log(error);
    });
  }
  deleteCompany(name, id){
    axios.delete("http://demoapi.nekhop.com/api/company/delete?&id="+id).then(response => {
      this.getCompanies();
    }).catch((error) => {
      console.log(error);
    });
  }
  updateCompany(id, data) {
    axios.put("http://demoapi.nekhop.com/api/company/update?id="+id, {
    data: JSON.stringify(data),
    headers: headers,
    }).then(response => {
      this.getCompanies();
    }).catch((error) => {
      console.log(error);
    });
  }
  constructor(props) {
    super(props);
    this.deleteCompany = this.deleteCompany.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    this.createCompany = this.createCompany.bind(this);
    this.getCompanies = this.getCompanies.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      companies: []
    };
  }
  componentDidMount() {
    this.getCompanies();
  }
  render() {
    const updatedata = {};
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Company Registration</h1>
        </header>
        <CompanyList companies={this.state.companies} deleteCompany={this.deleteCompany} />
        <div className="col-md-12 col-sm-12">
          <div className="col-md-6 col-sm-6">
            <Signup companies={this.state.companies} createCompany={this.createCompany} />
          </div>
          <div className="col-md-6 col-sm-6">
            <Login companies={this.state.companies} login={this.login} />
          </div>
        </div>
        <button onClick={()=> {this.updateCompany(9, updatedata)}}> update </button>
      </div>
    );
  }
}

export default App;
