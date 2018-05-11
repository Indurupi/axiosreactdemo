import React from "react";
import PropTypes from "prop-types";

function CompanyTable(props) {
  const { company } = props;
  return (
    <table>
      <tbody>
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
      </tbody>
    </table>
  );
}

CompanyTable.propTypes = {
  company: PropTypes.any
};

export default CompanyTable;
