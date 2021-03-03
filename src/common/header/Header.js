import React, { Component } from "react";
import "../header/Header.css";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from "@material-ui/icons/Search";
// import Button from '@material-ui/core/Button';
class Header extends Component {
  render() {
    return (
      <div>
        <div className="app-header">
          <div>Image Viewer</div>
          {this.props.searchBox === true ? (
            <span className="search-box">
              <SearchIcon style={{ color: "black"}} />
              <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
              />
            </span>
          ) : (
            ""
          )}
           </div>
      </div>
    );
  }
}
export default Header;
