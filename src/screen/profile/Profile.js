import React, { Component } from "react";
import "./Profile.css";
import Header from "../../common/header/Header";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
// import ListSubheader from "@material-ui/core/ListSubheader";

// Custom styles - Material Card component
const customStyles = (theme) => ({
  avatarStyle: {
    float: "left",
    width: "300px",
    height: "250px",
  },
  root: {
    margin: "2px auto",
    width: "80%",
    cursor: "pointer",
  },
});
const display = {
  display: "block",
};
const hide = {
  display: "none",
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      username: "",
      count_of_posts: 0,
      hardCoded_profile_pic: sessionStorage.getItem("profile_picture"),
      fullName: "Devanathan Babu ",
      showModal: "dispNone",
      toggle: false,
      usernameChange: "",
      usernameChangeModalShow: "dispNone",
      showModalforId: null,
    };
  }
  toggle = () => {
    console.log("modal");
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
  };
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
          username: posts_available[0].username,
          count_of_posts: that.state.count_of_posts + 1,
        });
      }
    });
  };
  updateUSerNamehandler = () => {
    this.setState({ showModal: true });
  };
  changeUsernameHandler = (e) => {
    if (this.state.usernameChange !== "") {
      this.setState({ fullName: this.state.usernameChange });
      this.toggle();
    } else {
      this.setState({ usernameChangeModalShow: "dispBlock" });
    }
  };
  inputUsernameChangeHandler = (e) => {
    this.setState({ usernameChange: e.target.value,usernameChangeModalShow: "dispNone"});
  };
  showModalforId = (id)=>{
    console.log(id);
    this.setState({showModalforId:id});
  }
  render() {
    var modal = [];
    if (this.state.usernameChangeModalShow == "dispBlock") {
      modal.push(
        <div className="modal" style={this.state.toggle ? display : hide}>
          <div className="modal-content">
            <h3> Edit</h3>
            <FormControl>
              <InputLabel htmlFor="user-name" required>
                Full Name
              </InputLabel>
              <Input
                id="user-name"
                type="text"
                onChange={this.inputUsernameChangeHandler}
              />
              <br />
            </FormControl>
            <FormHelperText className={this.state.usernameChangeModalShow}>
              <span className="red">required</span>
            </FormHelperText>
            <Button
              variant="contained"
              color="primary"
              onClick={this.changeUsernameHandler}
            >
              UPDATE
            </Button>
          </div>
        </div>
      );
    } else {
      if (this.state.showModalforId !== null) {
        console.log("iiii");
        let number_of_posts = this.state.posts.length;
        var temp_array = this.state.posts;
        var post = {};
        for (let i = 0; i < number_of_posts; i++) {
          if (temp_array[i].id === this.state.showModalforId) {
          post = temp_array[i];
        }
      }
        modal.push(
          <div className="modal" style={this.state.toggle ? display : hide}>
            <div className="modal-content image-showcase">
              <div className="leftside-modal">
                <img src={post.media_url} alt={post.id} />
              </div>
              <FormControl>
                <InputLabel htmlFor="user-name" required>
                  Full Name
                </InputLabel>
                <Input
                  id="user-name"
                  type="text"
                  onChange={this.inputUsernameChangeHandler}
                />
                <br />
              </FormControl>
              <FormHelperText className={this.state.usernameChangeModalShow}>
                <span className="red">required</span>
              </FormHelperText>
              <Button
                variant="contained"
                color="primary"
                onClick={this.changeUsernameHandler}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      }
    }
    const { classes } = this.props;
    return (
      <div>
        <Header
          profile={true}
          myAccount={false}
          profile_pic={this.state.hardCoded_profile_pic}
          history={this.props.history}
        />
        <div className="account-info-container">
          <div>
            <Avatar
              src={this.state.hardCoded_profile_pic}
              alt="Profile picture"
              className={classes.avatarStyle}
            />
          </div>
          <div>
            <h2>
              {this.state.posts.length > 0 && this.state.posts[0].username}
            </h2>
            <div className="profile-info-wrapper">
              <div>Posts: 3</div>
              <div>Follows: 12</div>
              <div>Followed By: 22</div>
            </div>
            <div className="flex font-weight-600">
              {this.state.fullName}
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.toggle}
              >
                <EditIcon className={classes.editIcon} />
              </Button>
              {modal}
            </div>
          </div>
        </div>
        <div className={classes.root}>
          <GridList cellHeight={300} cols={3}>
            {this.state.posts &&
              this.state.posts.length > 0 &&
              this.state.posts.map((post) => (
                <GridListTile
                  key={post.media_url}
                  onClick={(e) => this.showModalforId(post.id)}
                >
                  <img
                    src={post.media_url}
                    alt="Picture post"
                    width="250"
                    height="350"
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(Profile);
