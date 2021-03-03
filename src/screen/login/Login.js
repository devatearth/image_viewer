import React, { Component } from "react";
import "./Login.css";
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
      accessToken: "6cb0678c81c95afb45385e3f697e8c8d",
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
              <span className="red"> Incorrect username and/or password </span>
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
    );
  }
}
export default Login;
