import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      hardCoded_profile_pic:
        "https://rukminim1.flixcart.com/image/416/416/mask/t/z/h/tom-jerry-face-free-size-original-imaefczgyqqpz56y.jpeg?q=70",
      search_string: " ",
    };
  }
  seachInputHandler = (event) => {
    this.setState({ search_string: event.target.value });
    this.componentDidMount();
  };
  componentDidMount() {
    console.log(sessionStorage.getItem("access-token"));
    if (sessionStorage.getItem("access-token") == null) {
      console.log("out");
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
        console.log(response_Received);
        let number_of_posts = response_Received.data.length;
        for (let i = 0; i < number_of_posts; i++) {
          var id = response_Received.data[i].id;
          if (that.state.search_string !== " ") {
            if (
              response_Received.data[i].caption.search(
                "/" + that.state.search_string + "/i"
              )
            ) {
              that.temp(id);
            }
          } else {
            that.temp(id);
          }
        }
      }
    });
  }
  temp = (id) => {
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
        if (that.state.search_string === " ") {
          var posts_available = that.state.posts;
        } else {
          var posts_available = [];
        }
        console.log(that.state.search_string);
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
        <Header
          searchBox={true}
          profile={true}
          profile_pic={this.state.hardCoded_profile_pic}
          seachInputHandler={this.seachInputHandler}
          history={this.props.history}
        />
        <div>
          <GridList cellHeight="auto" cols={2}>
            {this.state.posts.map((post) => (
              <GridListTile key={"instagram" + post.id} className="grid-list">
                <Card className="poster" variant="outlined">
                  <CardHeader
                    avatar={
                      <Avatar>
                        <img
                          className="thumbnail-image"
                          src={this.state.hardCoded_profile_pic}
                          alt={post.id}
                        />
                      </Avatar>
                    }
                    title={post.username}
                    subheader={post.timestamp}
                  />
                  <CardContent>
                    <GridListTile key={"grid" + post.id}>
                      <img
                        src={post.media_url}
                        alt={post.id}
                        className="poster-image"
                      />
                      <Typography>
                        <b>{post.caption}</b>
                      </Typography>
                    </GridListTile>
                  </CardContent>
                </Card>
                <br />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Home;
