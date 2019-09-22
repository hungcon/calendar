import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import NotificationDialog from "./NotificationDialog"
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import constraints from '../../constrains';
import validate from 'validate.js';
import {firebaseConnect} from '../../firebaseConnect';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
class AddNewEventDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            clientName: '',
            startTime: new Date(),
            duration: 0,
            location:'',
            staffName: '',
        };
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
          this.addNewEvent();
        }
      };
      onCancelClick = () => {
        this.setState({open: false});
        this.props.closeAddEvent();
      }
      addNewEvent = () => {
        const { clientName, startTime, duration, location, staffName } = this.state; 
        const errors = validate({
            clientName: clientName,
            startTime: startTime,
            duration: duration,
            location: location,
            staffName: staffName
          }, {
            clientName: constraints.clientName,
            startTime: constraints.startTime,
            duration: validate.duration,
            location: constraints.location,
            staffName: constraints.staffName
          });
          if (errors) {
            this.setState({ errors });
          } else {
            var newEvent = {
                client_name: this.state.clientName,
                start_time: this.state.startTime,
                duration: this.state.duration,
                location: this.state.location,
                staff_name : this.state.staffName,
                user: localStorage.getItem('email')
            }
            const db = firebaseConnect.firestore();
              db.collection("events").add(newEvent)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.setState({isAddEventSuccess: true});
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            this.props.closeAddEvent();
          }  
      }

    render() {
        
        const { open } = this.state;
        const { clientName, duration, location, staffName,  errors } = this.state;
        return (
            <div>
                <Dialog open={open} onClose={this.onCancelClick} onKeyPress={this.handleKeyPress}>
                    <DialogTitle>
                    Add new event to your calendar
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                            label="Client name"
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
                                <DateTimePicker value={this.state.startTime} onChange={this.onStartTimeChange} label="Start time"/>
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
                           label="Staff name"
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
                        <Button color="primary" onClick={this.onCancelClick}>Cancel</Button>
                        <Button color="primary" onClick={this.addNewEvent}  variant="contained" >Add</Button>
                    </DialogActions>
                </Dialog>
                {this.state.isAddEventSuccess &&
                  <NotificationDialog />
                }
            </div>
        );
    }
}

export default AddNewEventDialog;