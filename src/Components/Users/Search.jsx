import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please Enter Something", "light");
    } else {
      this.props.searchUser(this.state.text);
      this.setState({ text: "" });
    }
  };

  render() {
    const { clearUser, showUser } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showUser && (
          <button className="btn btn-light btn-block" onClick={clearUser}>
            Clear User
          </button>
        )}
      </div>
    );
  }
}
Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  showUser: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};
export default Search;
