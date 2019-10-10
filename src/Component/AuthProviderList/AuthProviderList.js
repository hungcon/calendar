import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FacebookBoxIcon from 'mdi-material-ui/FacebookBox';
import GoogleIcon from 'mdi-material-ui/Google';
import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';
import firebase from 'firebase';

const styles = (theme) => ({
    listProvider: {
      justifyContent: 'center',
      marginTop: theme.spacing(2.5),
      marginBottom: theme.spacing(1)
    },
  
    facebook: {
      backgroundColor: '#3c5a99',
      color: '#ffffff'
    },
  
    google: {
      backgroundColor: '#4285f4',
      color: '#ffffff'
    },
  
    gitHub: {
      backgroundColor: '#24292e',
      color: '#ffffff'
    },
  
    icon: {
      marginRight: theme.spacing(0.5)
    }
  })

  

class AuthProviderList extends Component {
    onFacebookClick = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider).then(function(result) { 
          console.log('OK')  
        // The signed-in user info.
        var user = result.user;
        localStorage.setItem('email', user.email);
        this.props.historyProps.push({pathname: 'home'}); 
        }.bind(this));
    }
    onGoogleClick = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        //provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider).then(function(result) {   
        // The signed-in user info.
        var user = result.user;
       
       localStorage.setItem('email', user.email);
       //console.log(this)
        this.props.historyProps.push({pathname: 'home'}); 
        }.bind(this));
    }
    render() {
        const {classes} = this.props;
        return (
            
            <DialogActions className={classes.listProvider}>
                <Button className={classes.facebook} variant="contained" onClick = {() => this.onFacebookClick()}>
                <FacebookBoxIcon className={classes.icon}/>
                Facebook
                </Button>
                <Button className={classes.gitHub} variant="contained">
                <GitHubCircleIcon className={classes.icon}/>
                GitHub
                </Button>
                <Button className={classes.google} variant="contained" onClick = {() => this.onGoogleClick()}>
                <GoogleIcon className={classes.icon}/>
                Google
                </Button>
            </DialogActions>
        );
    }
}

export default withStyles(styles)(AuthProviderList);