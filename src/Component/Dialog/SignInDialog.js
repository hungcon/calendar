import React, { Component  } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignInDialog extends Component {

    constructor(props) {
        super(props);
        this.setState({
            email: "",
            password: "",
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

    handleClose = () => {
        this.setState({ open : false});
    }
    
    render() {
        return (
            <div>
                <Dialog open={this.state.open} >
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
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.handleClose()}>Cancel</Button>
                        <Button color="primary"  variant="contained" onClick = {() => this.handleClose()}>Sign In</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default SignInDialog;