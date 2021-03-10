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
    componentDidMount() {
      if (sessionStorage.getItem("access-token") === null) {
        this.props.history.push("/");
      }
      let data = null;
      let xhr = new XMLHttpRequest();
      let that = this;
      xhr.open(
        "GET",
        "https://graph.instagram.com/me/media?fields=id,caption&access_token=" +
          sessionStorage.getItem("access-token")
      );
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.send(data);
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          var response_Received = JSON.parse(this.responseText);
          let number_of_posts = response_Received.data.length;
          for (let i = 0; i < number_of_posts; i++) {
            var id = response_Received.data[i].id;
            that.getPostDetailsForID(id);
          }
         }
      });
    }
   getPostDetailsForID = (id) => {
      console.log(id);
      let data = null;
      let xhr = new XMLHttpRequest();
      let that = this;
      xhr.open(
        "GET",
        "https://graph.instagram.com/" +
          id +
          "?fields=id,media_type,media_url,username,timestamp,caption&access_token=" +
          sessionStorage.getItem("access-token")
      );
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.send(data);
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          var response = JSON.parse(this.responseText);
          var posts_available = that.state.posts;
          posts_available.push(response);
          that.setState({
            posts: posts_available,
          });
        }
      });
    };
  render() {
   
    return (
      <div>
        {console.log(this.state)}
        <Header
          profile={true}
          myAccount={false}
          profile_pic={this.state.hardCoded_profile_pic}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Profile;
