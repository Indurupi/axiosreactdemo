import React from "react";
import PropTypes from "prop-types";
import "../styles/customstyles.css";

function CompanyList(props) {
  return (
    <div>{props.companies.map(c => <div className="company-list" key={c.id}>
      <div>Company Name: {c.company_name}</div>
      <div>Full Domain: {c.full_domain}</div>
      <div>User Name: {c.username}</div>
      <div>Mobile: {c.mobile_number}</div>
      <div><button onClick={() => {props.deleteCompany(c.name, c.id)}}>Delete</button></div>
      </div>)}
    </div>
  );
}

CompanyList.propTypes = {
  companies: PropTypes.array.isRequired
};

export default CompanyList;
