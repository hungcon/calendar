import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import { connect } from 'react-redux';
import SignInDialog from '../Dialog/SignInDialog';
import SignUpDialog from '../Dialog/SignUpDialog';
import {firebaseConnect} from '../../firebaseConnect';

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
              }
        };
    }

    onSignOutClick = () => {
        this.props.signOut();
        this.setState({
            menu: {
                anchorEl: null
              }
        });
        firebaseConnect.auth().signOut();
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

    render() {
        console.log(this.props.openSignInDialog);
        console.log(this.props.openSignUpDialog);
        const { classes } = this.props;
        const { menu } = this.state;
        return (
            <div>
                <AppBar position="static">
                <Toolbar variant="regular">
                <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">Calendar Management</Typography>
                {!this.props.isSignIned &&
                    <React.Fragment>
                        <Button  color="secondary"  className={classes.signUpButton} variant="contained"  onClick={() =>this.props.displaySignUpDialog()} >Sign Up</Button>
                        <Button color="secondary"  variant="contained" onClick={() =>this.props.displaySignInDialog()}>Sign In</Button>
                    </React.Fragment>
                    
                }
                {this.props.isSignIned &&
                    <React.Fragment>
                        <IconButton color="inherit" onClick={this.openMenu} >
                            <PersonIcon />
                        </IconButton>

                        <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                            <MenuItem  >Settings</MenuItem>
                            <MenuItem  onClick={() =>this.onSignOutClick()}>Sign out</MenuItem>
                        </Menu>
                        
                    </React.Fragment>
                }
                {!this.props.isSignIned && this.props.openSignInDialog &&
                    <SignInDialog></SignInDialog>
                }

                {!this.props.isSignIned && this.props.openSignUpDialog &&
                    <SignUpDialog></SignUpDialog>
                }
                </Toolbar>
                </AppBar>
                <Container fixed>
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
                </Container>   
            </div>
        );
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        openSignInDialog: state.openSignInDialog,
        openSignUpDialog: state.openSignUpDialog,
        isSignIned: state.isSignIned
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        displaySignInDialog: () => {
            dispatch({type: 'DISPLAY_SIGNIN_DIALOG'})
        },
        displaySignUpDialog: () => {
            dispatch({type: 'DISPLAY_SIGNUP_DIALOG'})
        },
        signOut: () => {
            dispatch({type: 'SIGN_OUT'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));