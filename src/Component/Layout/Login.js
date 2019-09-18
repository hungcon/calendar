import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import SignInDialog from '../Dialog/SignInDialog';
import SignUpDialog from '../Dialog/SignUpDialog';

const styles = (theme) => ({
    signUpButton: {
      marginRight: theme.spacing(2)
    }
  });

class Login extends Component { 
    
    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="static">
                <Toolbar variant="regular">
                <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">Calendar Management</Typography>
                    <React.Fragment>
                        <Button  color="secondary"  className={classes.signUpButton} variant="contained"  onClick={() =>this.props.displaySignUpDialog()} >Sign Up</Button>
                        <Button color="secondary"  variant="contained" onClick={() =>this.props.displaySignInDialog()}>Sign In</Button>
                    </React.Fragment>
                    {this.props.openSignInDialog &&
                        <SignInDialog></SignInDialog>
                    }

                    {this.props.openSignUpDialog &&
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
        openSignUpDialog: state.openSignUpDialog
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        displaySignInDialog: () => {
            dispatch({type: 'DISPLAY_SIGNIN_DIALOG'})
        },
        displaySignUpDialog: () => {
            dispatch({type: 'DISPLAY_SIGNUP_DIALOG'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));