import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import SignInDialog from '../Dialog/SignInDialog';

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
                        <Button  color="secondary"  className={classes.signUpButton} variant="contained" >Sign Up</Button>
                        <Button color="secondary"  variant="contained" onClick={() =>this.props.displaySignInDialog()}>Sign In</Button>
                    </React.Fragment>
                    {this.props.handleSignInDialog &&
                        <SignInDialog></SignInDialog>
                    }
                    
                </Toolbar>
                </AppBar>
            </div>
        );
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        handleSignInDialog: state.handleSignInDialog
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        displaySignInDialog: () => {
            dispatch({type: 'DISPLAY_SIGNIN_DIALOG'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));