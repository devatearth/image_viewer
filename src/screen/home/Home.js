import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
// import GridList from "@material-ui/core/GridList";
// import GridListTile from "@material-ui/core/GridListTile";
// import GridListTileBar from "@material-ui/core/GridListTileBar";

class Home extends Component {
    
  constructor() {
    super();
    this.state = {
      posts: {},
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
        var response = JSON.parse(this.responseText);
        var number_of_posts = response.data.length;
        for (var i = 0; i < number_of_posts; i++) {
        var id = response.data[i].id;
        that.temp(id);
        }
      }
    });
  }
  temp = (id)=>{
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://graph.instagram.com/"+id+"?fields=id,media_type,media_url,username,timestamp&access_token=" +
        sessionStorage.getItem("access-token")
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        var response = JSON.parse(this.responseText);
        for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
        }
      }
    });
  } 
  render() {
    console.log(this.state);
    return (
      <div>
        <Header searchBox={true} profile={true} />
        <div className="flex-container">
          {/* <GridList cellHeight={350} cols={2}>
            {this.state.posts.map((post) => (
            
              <GridListTile key={"grid" + posts.id}>
                <img
                  src={movie.poster_url}
                  className="movie-poster"
                  alt={movie.title}
                />
                <GridListTileBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date:{" "}
                      {new Date(movie.release_date).toDateString()}
                    </span>
                  }
                />
              </GridListTile>
            ))}
          </GridList> */}
        </div>
      </div>
    );
  }
}

export default Home;
