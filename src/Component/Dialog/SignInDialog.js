import React, { Component  } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import validate from 'validate.js';
import constraints from '../../constrains';
import {firebaseConnect} from '../../firebaseConnect';
import readingTime from 'reading-time';

class SignInDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            open: false,
            errors: null,
            snackbar: {
                autoHideDuration: 0,
                message: '',
                open: false
           },
        };
    }

    UNSAFE_componentWillMount () {
        this.setState({
            open: true
        });
    }
    handleKeyPress = (event) => {
      const key = event.key;
  
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }
  
      if (key === 'Enter') {
        this.signIn();
      }
    };

    onEmailChange = event => {
        this.setState({email: event.target.value});
      };
    onPasswordChange = event => {
        this.setState({password: event.target.value});
      };

    openSnackbar = (message) => {
        this.setState({
          snackbar: {
            autoHideDuration: readingTime(message).time * 2,
            message,
            open: true
          }
        });
      };

    signIn = () => {  
        const { email, password } = this.state;    
        const errors = validate({
            email: email,
            password: password
          }, {
            email: constraints.email,
            password: constraints.password
          });
          if (errors) {
            this.setState({ errors });
          } else {
              firebaseConnect.auth().signInWithEmailAndPassword(email, password)
              .then( () => {
                localStorage.setItem('email', email);
                this.setState({ 
                    errors: null,
                });
                this.props.history.push({pathname: 'home'});  
              })
              .catch((reason) => {
                const code = reason.code;
                const message = reason.message;
        
                switch (code) {
                  case 'auth/email-already-in-use':
                  case 'auth/invalid-email':
                  case 'auth/operation-not-allowed':
                  case 'auth/weak-password':
                    this.openSnackbar(message);
                    return;
                  default:
                    this.openSnackbar(message);
                    return;
                }
                })
                
        }
    }
    onCancelClick = () => {
      this.setState({open: false});
      this.props.closeSignIn();
    }
    
    render() {
        const { snackbar } = this.state; 
        const { open } = this.state;
        const { email, password, errors } = this.state;
        return (
            <div>
                <Dialog open={open} onClose={this.onCancelClick} onKeyPress={this.handleKeyPress}>
                    <DialogTitle>
                    Sign in to your account
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Some features might be unavailable until you sign in.
                            While you're signed in you can manage your account.
                        </DialogContentText>
                        <form>
                            <TextField
                            autoComplete="email"
                            error={!!(errors && errors.email)}
                            fullWidth
                            helperText={(errors && errors.email) ? errors.email[0] : ''}
                            margin="normal"
                            onChange={this.onEmailChange}
                            placeholder="E-mail address"
                            required
                            type="email"
                            value={email}
                            />

                            <TextField
                            autoComplete="current-password"
                            error={!!(errors && errors.password)}
                            fullWidth
                            helperText={(errors && errors.password) ? errors.password[0] : ''}
                            margin="normal"
                            onChange={this.onPasswordChange}
                            placeholder="Password"
                            required
                            type="password"
                            value={password}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.onCancelClick()}>Cancel</Button>
                        <Button color="primary" disabled={(!email || !password)}  variant="contained" onClick = {() => this.signIn()}>Sign In</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                  autoHideDuration={snackbar.autoHideDuration}
                  message={snackbar.message}
                  open={snackbar.open}
                  onClose={this.closeSnackbar}
                />
            </div>
        );
    }
}
export default (SignInDialog);