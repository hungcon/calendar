import React, { Component  } from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import {firebaseConnect} from '../../firebaseConnect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import readingTime from 'reading-time';
import validate from 'validate.js';
import constraints from '../../constrains'

class SignUpDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
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

    handleEmailAddressChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleConfirmPasswordChange = (event) => {
        this.setState({
            confirmPassword: event.target.value
        });
    }

    handleClose = () => {
        this.setState({ open : false});
        this.props.closeDialog();
    }
    openSnackbar = (message) => {
        this.setState({
          snackbar: {
            autoHideDuration: readingTime(message).time * 2,
            message,
            open: true
          }
        });
      };

    handleSignUpClick = () => {
        const { email, password, confirmPassword } = this.state;
        const errors = validate({
            email: email,
            password: password,
            confirmPassword: confirmPassword
          }, {
            email: constraints.email,
            password: constraints.password,
            confirmPassword: constraints.confirmPassword
          });
          if (errors) {
            this.setState({ errors });
          } else {
            firebaseConnect.auth().createUserWithEmailAndPassword(email, password)
            .then( () => {
              window.localStorage.setItem('email', email);
              this.setState({ 
                  errors: null,
              });
              this.props.signIn();
              this.handleClose();
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
    
    render() {
        const { snackbar } = this.state
        const { errors } = this.state;
        const { open } = this.state;
        const { email, password, confirmPassword } = this.state;
        return (
            <div>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle>
                    Sign up for an account
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Create an account to access features that are unavailable to users who haven't signed up.
                        </DialogContentText>
                        <form>
                        <TextField
                            autoComplete="email"
                            error={!!(errors && errors.email)}
                            fullWidth
                            helperText={(errors && errors.email) ? errors.email[0] : ''}
                            margin="normal"
                            onChange={this.handleEmailAddressChange}
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
                            onChange={this.handlePasswordChange}
                            placeholder="Password"
                            required
                            type="password"
                            value={password}
                            />

                            <TextField
                            autoComplete="current-password"
                            error={!!(errors && errors.confirmPassword)}
                            fullWidth
                            helperText={(errors && errors.confirmPassword) ? errors.confirmPassword[0] : ''}
                            margin="normal"
                            onChange={this.handleConfirmPasswordChange}
                            placeholder="Confirm Password"
                            required
                            type="password"
                            value={confirmPassword}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.handleClose()}>Cancel</Button>
                        <Button color="primary" disabled={(!email|| !password || !confirmPassword)}  variant="contained" onClick = {() => this.handleSignUpClick()}>Sign Up</Button>
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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeDialog: () => {
            dispatch({type: 'DISPLAY_SIGNUP_DIALOG'})
        },
        signIn: () => {
            dispatch({type: 'SIGNINED'})
        },
    }
}

export default connect(null, mapDispatchToProps)(SignUpDialog);