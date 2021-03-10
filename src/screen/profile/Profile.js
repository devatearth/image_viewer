import React, { Component } from "react";
import "./Profile.css";
import Header from "../../common/header/Header";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
         posts: [],
         hardCoded_profile_pic:
            "https://rukminim1.flixcart.com/image/416/416/mask/t/z/h/tom-jerry-face-free-size-original-imaefczgyqqpz56y.jpeg?q=70",
        };
    }
  render() {
   
    return (
      <div>
        <Header
          profile={true}
          profile_pic={this.state.hardCoded_profile_pic}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Profile;
