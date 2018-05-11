import React from "react";
import PropTypes from "prop-types";
import "../styles/customstyles.css";
import CompanyTable from './company_table';


class CompanyList extends React.Component {
  render() {
    return (
      <div className="">
      {
        this.props.companies.map(c => <div className="company-list" key={c.id}>
        <CompanyTable company={c} />
        <div>
          <button
            className={'purple-gradient button-style disp-inline width-100'}
            onClick={() => {this.props.deleteCompany(c.name, c.id)}}
          > Delete </button>
        </div>
        </div>)}
      </div>
    );
  }
}

CompanyList.propTypes = {
  companies: PropTypes.array.isRequired,
  deleteCompany: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default CompanyList;
