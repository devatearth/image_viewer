import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
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
        console.log("deva");
        for (let i = 0; i < number_of_posts; i++) {
          var id = response_Received.data[i].id;
          that.temp(id);
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
        var posts_available = that.state.posts;
        posts_available.push(response);
        that.setState({
          posts: posts_available,
        });
      }
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <Header searchBox={true} profile={true} />

        <div className="flex-container">
          <GridList cellHeight={600} cols={2} className="poster">
            {this.state.posts.map((post) => (
              <div>
                <Card variant="outlined">
                  <CardHeader
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={post.username}
                    subheader={post.timestamp}
                  />
                  <CardContent>
                    <GridListTile key={"grid" + post.id}>
                      <img src={post.media_url} alt={post.caption} />
                    </GridListTile>
                  </CardContent>
                </Card>
                <br/>
              </div>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Home;
