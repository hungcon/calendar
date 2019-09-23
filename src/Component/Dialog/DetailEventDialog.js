import React, { Component  } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";
  import {firebaseConnect} from '../../firebaseConnect';
import NotificationDialog from './NotificationDialog';


class DetailEventDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            isScheduleChange: false,
            confirmDeleteState: false,
            clientName: this.props.clientName,
            duration: this.props.duration,
            location: this.props.location,
            staffName: this.props.staffName,
            startTime: this.props.startTime,
            id: this.props.id
        }
    }
    onClientNameChange = event => {
        this.setState({clientName: event.target.value});
      };
    onStartTimeChange = event => {
        this.setState({startTime: new Date(event)});
      };

      onDurationChange = event => {
        this.setState({duration: event.target.value});
      };
      onLocationChange = event => {
        this.setState({location: event.target.value});
      };
      onStaffNameChange = event => {
        this.setState({staffName: event.target.value});
      };

      handleKeyPress = (event) => {
        const key = event.key;
    
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
          return;
        }
    
        if (key === 'Enter') {
          this.editEvent();
        }
      };

      editEvent = () => {
        const db = firebaseConnect.firestore();
        db.collection("events").doc(this.state.id).update({
          client_name: this.state.clientName,
          start_time: this.state.startTime,
          duration: this.state.duration,
          location: this.state.location,
          user: localStorage.getItem('email'),
          staff_name: this.state.staffName
        })
        this.setState({isScheduleChange: true, open: false});

      }

      onCancelClick = () => {
        this.setState({open: false});
        this.props.closeDetailEvent();
      }
      removeEvent = () => {  
        if(window.confirm('Are you want to cancle this schedule?') === true){
          const db = firebaseConnect.firestore();
          db.collection("events").doc(this.state.id).delete().then(() => {
            this.setState({
              isScheduleChange: true,
              open: false
            });
            
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
        }
      }
    
    render() {
        const { open } = this.state;
        const { clientName, duration, location, staffName,  errors } = this.state;
        return (
            <div>
               <Dialog open={open} onClose={this.onCancelClick} onKeyPress={this.handleKeyPress}>
                    <DialogTitle>
                   DetailEvent
                    </DialogTitle>
                    <DialogContent>
                        <form>
                        <TextField
                           label="Client Name"
                           error={!!(errors && errors.clientName)}
                            fullWidth
                           helperText={(errors && errors.clientName) ? errors.clientName[0] : ''}
                            margin="normal"
                            onChange={this.onClientNameChange}
                            placeholder="Client name"
                            required
                            type="text"
                            value={clientName}
                            />
                            
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker value={this.state.startTime} onChange={this.onStartTimeChange}  label="Start time"/>
                        </MuiPickersUtilsProvider>

                          <TextField
                           label="Duration"
                           error={!!(errors && errors.duration)}
                           fullWidth
                           helperText={(errors && errors.duration) ? errors.duration[0] : ''}
                           margin="normal"
                           onChange={this.onDurationChange}
                           placeholder="Duration (hours)"
                           required
                           type="number"
                           inputProps={{ min: "0", step: "1" }}
                           value={duration}
                           />

                          <TextField
                           label="Location"
                           error={!!(errors && errors.location)}
                           fullWidth
                           helperText={(errors && errors.location) ? errors.location[0] : ''}
                           margin="normal"
                           onChange={this.onLocationChange}
                           placeholder="Location"
                           required
                           type="text"
                           value={location}
                           />
                          <TextField
                           label="Staff Name"
                           error={!!(errors && errors.staffName)}
                           fullWidth
                           helperText={(errors && errors.staffName) ? errors.staffName[0] : ''}
                           margin="normal"
                           onChange={this.onStaffNameChange}
                           placeholder="Staff name"
                           required
                           type="text"
                           value={staffName}
                           />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.onCancelClick()}>Cancel</Button>
                        <Button color="inherit" onClick={() => this.removeEvent()} >Remove</Button>
                        <Button color="primary"  variant="contained" onClick = {() => this.editEvent()}>Edit</Button>
                    </DialogActions>
                </Dialog>

                {this.state.isScheduleChange &&
                  <NotificationDialog />
                }
               
            </div>
        );
    }
}

export default DetailEventDialog;