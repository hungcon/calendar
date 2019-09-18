import React, { Component  } from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignUpDialog extends Component {

    constructor(props) {
        super(props);
        this.setState({
            email: "",
            password: "",
            confirmPassword: "",
        });
    }

    componentWillMount () {
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
    
    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                    Sign up 
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            sign up
                        </DialogContentText>
                        <form>
                            <TextField
                            autoComplete="email"
                            //error={!!(errors && errors.emailAddress)}
                            fullWidth
                           // helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
                            margin="normal"
                            onChange={this.handleEmailAddressChange}
                            placeholder="E-mail address"
                            required
                            type="email"
                            //value={emailAddress}
                            />

                            <TextField
                            autoComplete="current-password"
                            //error={!!(errors && errors.password)}
                            fullWidth
                            helperText=""
                            margin="normal"
                            onChange={this.handlePasswordChange}
                            placeholder="Password"
                            required
                            type="password"
                            //value={password}
                            />

                            <TextField
                            autoComplete="current-password"
                            //error={!!(errors && errors.password)}
                            fullWidth
                            helperText=""
                            margin="normal"
                            onChange={this.handleConfirmPasswordChange}
                            placeholder="Confirm Password"
                            required
                            type="password"
                            //value={password}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.handleClose()}>Cancel</Button>
                        <Button color="primary"  variant="contained" onClick = {() => this.handleClose()}>Sign Up</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeDialog: () => {
            dispatch({type: 'DISPLAY_SIGNUP_DIALOG'})
        }
    }
}

export default connect(null, mapDispatchToProps)(SignUpDialog);