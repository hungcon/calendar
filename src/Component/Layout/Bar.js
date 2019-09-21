import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SignInDialog from '../Dialog/SignInDialog';
import SignUpDialog from '../Dialog/SignUpDialog';
import { Redirect } from 'react-router-dom';

const styles = (theme) => ({
    signUpButton: {
      marginRight: theme.spacing(2)
    }
  });


class Login extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            menu: {
                anchorEl: null
              },
              isLogin : false,
              isSignUp: false
        };
    }

    openMenu = (event) => {
        const anchorEl = event.currentTarget;
        this.setState({
          menu: {
            anchorEl
          }
        });
      };
    
      closeMenu = () => {
        this.setState({
          menu: {
            anchorEl: null
          }
        });
      };

      openSignIn = () => {
          this.setState({isLogin: true});
      }

      openSignUp = () => {
        this.setState({isSignUp: true});
    }

    render() {
        const { classes } = this.props;
        if(localStorage.getItem('email') !== null){ return <Redirect to='/home'/>}
        return (
            <div>
                <AppBar position="static">
                <Toolbar variant="regular">
                <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">Calendar Management</Typography>
                    <React.Fragment>
                        <Button  color="secondary"  className={classes.signUpButton} variant="contained"  onClick={() =>this.openSignUp()} >Sign Up</Button>
                        <Button color="secondary"  variant="contained" onClick={() =>this.openSignIn()}>Sign In</Button>
                    </React.Fragment>
                
                {this.state.isLogin &&
                    <SignInDialog history={this.props.history} closeSignIn={ () => this.setState({isLogin: false})}></SignInDialog>
                }

                {this.state.isSignUp &&
                    <SignUpDialog history={this.props.history} closeSignUp={ () => this.setState({isSignUp: false})}></SignUpDialog>
                }
                </Toolbar>
                </AppBar>
            </div>
        );
    }
    
}



export default withStyles(styles)(Login);