import React, { Component  } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class NotificationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }
    handleClose = () => {
        this.setState({open: false});
        window.location.reload();
    }

    render() {
        const { open } = this.state;
        return (
            <div>
                <Dialog  open={open}  onClose={this.handleClose}>
                    <DialogTitle id="alert-dialog-title">Notification</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Your schedule have been update.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog> 
            </div>
        );
    }
}

export default NotificationDialog;