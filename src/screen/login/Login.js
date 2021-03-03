import React, { Component } from "react";
import "./Login.css";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loginControl: "disp-none",
      accessToken: "IGQVJXeTJXSko4SzlHQ0RLS2tsdG9hbVNCY0p3VlE3QzNiZAWFYLWVFR096ZA1hXTXg4djNVVnlWWVZAPbzV5RjM2dFJfLVpCbDExS3E1MGg4S3dCLUd5b0twYWFDS3N1VTVvT1JMU05mWUI2cFB2c2JhdwZDZD",
      dummy_username: "Dev",
      dummy_password: "12345678",
      usernameRequired: "disp-none",
      passwordRequired: "disp-none",
    };
  }
  loginClickHandler = () => {
    this.state.username === ""
      ? this.setState({ usernameRequired: "disp-block" })
      : this.setState({ usernameRequired: "disp-none" });
    this.state.password === ""
      ? this.setState({ passwordRequired: "disp-block" })
      : this.setState({ passwordRequired: "disp-none" });
    if (
      this.state.username === this.state.dummy_username &&
      this.state.password === this.state.dummy_password
    ) {
      this.setState({ loginControl: "disp-none" });
      sessionStorage.setItem("access-token", this.state.accessToken);
      this.props.history.push("/home");
    } else if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ loginControl: "disp-block" });
    } else {
      this.setState({ loginControl: "disp-none" });
    }
  };
  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };
  inputPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="login-card">
          <br />
          <Card className="login-content">
            <CardContent>
              <b>LOGIN</b>
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="user-name" required>
                  Username
                </InputLabel>
                <Input
                  id="user-name"
                  type="text"
                  onChange={this.inputUsernameChangeHandler}
                />
              </FormControl>
              <FormHelperText className={this.state.usernameRequired}>
                <span className="red">required</span>
              </FormHelperText>
              <br />
              <br />
              <FormControl>
                <InputLabel htmlFor="password" required>
                  Password
                </InputLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={this.inputPasswordChangeHandler}
                />
              </FormControl>
              <FormHelperText className={this.state.passwordRequired}>
                <span className="red">required</span>
              </FormHelperText>
              <FormHelperText
                id="my-helper-text"
                className={this.state.loginControl}
              >
                <br />
                <span className="red">
                  {" "}
                  Incorrect username and/or password{" "}
                </span>
              </FormHelperText>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}
export default Login;
