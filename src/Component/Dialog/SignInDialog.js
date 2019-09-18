import React, { Component  } from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import validate from 'validate.js';
import constraints from '../../constrains';


class SignInDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
           open: false,
           errors: null
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

    handleClose = () => {
        this.setState({ open : false});
        this.props.closeDialog();
    }

    handleSignInClick = () => {
        //this.handleClose();
        const errors = validate({
            email: this.state.email,
            password: this.state.password
          }, {
            email: constraints.email,
            password: constraints.password
          });
          console.log(!!(this.state.errors && this.state.errors.password))
          if (errors) {
            this.setState({ errors });
          } else {
              this.setState({ errors: null})
          }
    }
    
    
    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
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
                            error={!!(this.state.errors && this.state.errors.email)}
                            fullWidth
                            helperText={(this.state.errors && this.state.errors.email) ? this.state.errors.email[0] : ''}
                            margin="normal"
                            onChange={this.handleEmailAddressChange}
                            placeholder="E-mail address"
                            required
                            type="email"
                            value={this.state.email}
                            />

                            <TextField
                            autoComplete="current-password"
                            error={!!(this.state.errors && this.state.errors.password)}
                            fullWidth
                            helperText={(this.state.errors && this.state.errors.password) ? this.state.errors.password[0] : ''}
                            margin="normal"
                            onChange={this.handlePasswordChange}
                            placeholder="Password"
                            required
                            type="password"
                            value={this.state.password}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.handleClose()}>Cancel</Button>
                        <Button color="primary"  variant="contained" onClick = {() => this.handleSignInClick()}>Sign In</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeDialog: () => {
            dispatch({type: 'DISPLAY_SIGNIN_DIALOG'})
        }
    }
}

export default connect(null, mapDispatchToProps)(SignInDialog);