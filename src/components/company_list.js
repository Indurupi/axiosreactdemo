import React from "react";
import PropTypes from "prop-types";
import "../styles/customstyles.css";

function CompanyList(props) {
  return (
    <div className="">
    {
      props.companies.map(c => <div className="company-list" key={c.id}>
      <div>Company Name: {c.company_name}</div>
      <div>Full Domain: {c.full_domain}</div>
      <div>User Name: {c.username}</div>
      <div>Mobile: {c.mobile_number}</div>
      <div>
        <button
          className={'purple-gradient button-style disp-inline'}
          onClick={() => {props.deleteCompany(c.name, c.id)}}
        > Delete </button>
        <button
          className={'purple-gradient button-style disp-inline'}
          onClick={() => {props.setActivePage('update')}}
        > Update </button>
      </div>
      </div>)}
    </div>
  );
}

CompanyList.propTypes = {
  companies: PropTypes.array.isRequired,
  deleteCompany: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default CompanyList;
