import React from "react";
import PropTypes from "prop-types";

function companyTable(props) {
  const { company } = props;
  return (
    <table>
      <tr>
        <td>Company Name</td>
        <td>:</td>
        <td>{company.company_name}</td>
      </tr>
      <tr>
        <td>Full Domain</td>
        <td>:</td>
        <td>{company.full_domain}</td>
      </tr>
      <tr>
        <td>User Name</td>
        <td>:</td>
        <td>{company.username}</td>
      </tr>
      <tr>
        <td>Mobile</td>
        <td>:</td>
        <td>{company.mobile_number}</td>
      </tr>
    </table>
  );
}

companyTable.propTypes = {
  login: PropTypes.func.isRequired
};

export default companyTable;
