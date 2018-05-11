import React, { Component } from "react";
import axios from "axios";


import CompanyList from "./components/company_list";

import Signup from './components/signup';
import Login from './components/login';

const customHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-header'
};

class App extends Component {

  static jsonResponse(value) {
    return JSON.parse(JSON.stringify(value));
  }

  constructor(props) {
    super(props);
    this.deleteCompany = this.deleteCompany.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    this.createCompany = this.createCompany.bind(this);
    this.getCompanies = this.getCompanies.bind(this);
    this.login = this.login.bind(this);
    this.setActivePage = this.setActivePage.bind(this);
    this.state = {
      companies: [],
      token: '',
      activePage: 'companyList'
    };
  }
  getCompanies() {
    // if(this.state.token) {
    axios
      .get("http://demoapi.nekhop.com/api/company/", {
  	headers: customHeaders
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
    // }
  }
  createCompany(data) {
    const newCompany = JSON.stringify(data);
    axios.post("http://demoapi.nekhop.com/api/company/create",
    data: newCompany,
    {
    headers: customHeaders,
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
    headers: customHeaders
    }).then(response => {
      const success = App.jsonResponse(response.data.success);
      if(success) {
        const token = App.jsonResponse(response.data.data.access_token);
        this.setState({ token,
        activePage: 'companyList' });
        this.getCompanies();
      } else {
        document.getElementById('login-error').innerHTML = 'Wrong credentials';
      }
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
    headers: customHeaders,
    }).then(response => {
      this.getCompanies();
    }).catch((error) => {
      console.log(error);
    });
  }
  setActivePage(newPage) {
    this.setState({
      activePage: newPage
    });
  }
  componentDidMount() {
    this.getCompanies();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Company Registration</h1>
        </header>
        <div className="col-md-12 col-sm-12">
        {this.state.activePage === 'login' ? <Login login={this.login} /> : null}
        {this.state.activePage === 'companyList' ?
        <div>
        <div className={'text-center'} style={{ marginTop: '10px' }}><button className={'purple-gradient button-style'} onClick={()=> {this.setActivePage('signUp')}}> Create Company </button></div>
          <CompanyList
            companies={this.state.companies}
            deleteCompany={this.deleteCompany}
            setActivePage={this.setActivePage}
          />
        </div> : null
        }
        {
          this.state.activePage === 'signUp' ?
          <div>
            <div className={'text-center'} style={{ marginTop: '10px' }}><button className={'purple-gradient button-style'} onClick={()=> {this.setActivePage('companyList')}}> See Company Lists </button></div>
            <Signup
              companies={this.state.companies}
              createCompany={this.createCompany}
            />
            </div> : null
        }
        </div>
      </div>
    );
  }
}

export default App;
