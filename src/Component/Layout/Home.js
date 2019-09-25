import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import {firebaseConnect} from '../../firebaseConnect';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
 import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddNewEventDialog from '../Dialog/AddNewEventDialog';
import DetailEventDialog from '../Dialog/DetailEventDialog';
const localizer = momentLocalizer(moment); 
const styles = (theme) => ({
  fab: {
    margin: theme.spacing(2),
  }
});
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {
                anchorEl: null
              },
             events: [],
             isAddEvent: false,
             change: false,
        };
    }
 
    openMenu = (event) => {
        const anchorEl = event.currentTarget;
    
        this.setState({
          menu: {
            anchorEl
          }
        });
      };
    
      closeMenu = () => {
        this.setState({
          menu: {
            anchorEl: null
          }
        });
      };
      
      onSignOutClick = () => {
        localStorage.removeItem('email');
        this.setState({
            menu: {
                anchorEl: null
            },
            event: [],
        });
        firebaseConnect.auth().signOut().then(() => {
          this.props.history.push("/");
             
        }).catch(function(reason) {
          // An error happened.
        });     
    } 

    componentWillMount() {
      const eventsDB = [];
      var db = firebaseConnect.firestore();
      db.collection('events').where("user", "==", localStorage.getItem('email')).get()
      .then(function (snapshot) {
          snapshot.forEach(function(doc){
            var eventItem = {
              id: doc.id,
              client_name: doc.data().client_name,
              title: "Hẹn với " + doc.data().client_name,
              start: new Date(doc.data().start_time.seconds*1000),
              end: new Date(doc.data().start_time.seconds*1000 + doc.data().duration*3600000),
              location: doc.data().location,
              staff_name: doc.data().staff_name,
              duration: doc.data().duration
            }
            eventsDB.push(eventItem);
          });
          this.setState({events: eventsDB});
        }.bind(this))
        
    }

    componentDidMount() {
      var db = firebaseConnect.firestore();
      db.collection("events").onSnapshot(function (snapshot) {
              //console.log(snapshot.docChanges());
              snapshot.docChanges().forEach((change) => {
                  // if (change.type === "added") {
                  //   var currentEvent = this.state.events;
                  //   var eventAdded = {
                  //     id: change.doc.id,
                  //     client_name: change.doc.data().client_name,
                  //     title: "Hẹn với " + change.doc.data().client_name,
                  //     start: new Date(change.doc.data().start_time.seconds*1000),
                  //     end: new Date(change.doc.data().start_time.seconds*1000 + change.doc.data().duration*3600000),
                  //     location: change.doc.data().location,
                  //     staff_name: change.doc.data().staff_name,
                  //     duration: change.doc.data().duration
                  //   }
                  //   this.state.events.push(eventAdded);
                  //   this.setState({events: this.state.events});
                  // }
                  if (change.type === "modified") {
                    var currentEvent = this.state.events;
                    var index = currentEvent.findIndex(item => item.id === change.doc.id);
                    var eventChange = {
                      id: change.doc.id,
                      client_name: change.doc.data().client_name,
                      title: "Hẹn với " + change.doc.data().client_name,
                      start: new Date(change.doc.data().start_time.seconds*1000),
                      end: new Date(change.doc.data().start_time.seconds*1000 + change.doc.data().duration*3600000),
                      location: change.doc.data().location,
                      staff_name: change.doc.data().staff_name,
                      duration: change.doc.data().duration
                    }
                    currentEvent[index] = eventChange;
                    this.setState({events: currentEvent});  
                  }
                  if (change.type === "removed") {
                    var newEvents = this.state.events.filter(item => {
                      return item.id !== change.doc.id
                    } )
                    this.setState({events: newEvents});
                  }
              });
          }.bind(this));
  }

    addEvent= () => {  
      this.setState({isAddEvent: true});
    }
    shouldComponentUpdate(nextState) {
      if(this.state.change !== nextState.change){
        return true;
      } return false;
    }

    showDetailEvent = (detailEvent) => {
      this.setState({
        detailEvent: detailEvent,
        isDetailEvent: true
      });
    }

    getEventAdd = (eventAdd) => {
      this.state.events.push(eventAdd);
      this.setState({events: this.state.events})
    }

    getIDEventDelete = (id) => {
      var newState = this.state.events.filter(event => {
        return event.id !== id;
      })
      this.setState({events: newState});
    }

    updateEvent = (event) => {
      var currentEvent = this.state.events;
      var index = currentEvent.findIndex(item => item.id === event.id);
      currentEvent[index] = event;
      this.setState({events: currentEvent});
    }
    render() {
      const {classes} = this.props;
        const { menu } = this.state;
        return ( 
            <div>
                <AppBar position="static">
                <Toolbar variant="regular">
                <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">Calendar Management</Typography>               
                    <React.Fragment>
                        <IconButton color="inherit" onClick={this.openMenu} >
                            <PersonIcon />
                        </IconButton>

                        <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>
                            <MenuItem  >Settings</MenuItem>
                            <MenuItem  onClick={() =>this.onSignOutClick()}>Sign out</MenuItem>
                        </Menu>    
                    </React.Fragment>
                </Toolbar>
                </AppBar>
                <Container fixed>
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.addEvent}>
                      <AddIcon />
                    </Fab>
                    <div style={{ height: '500pt'}}> 
                        <Calendar
                        events={this.state.events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={moment().toDate()}
                        localizer={localizer}
                        onSelectEvent={(detailEvent) => this.showDetailEvent(detailEvent)}
                        />
                     </div>
                </Container>
                {this.state.isAddEvent && 
                      <AddNewEventDialog closeAddEvent = { () => {this.setState({isAddEvent: false})}}  getEventAdd = {this.getEventAdd}/>}
                {this.state.isDetailEvent && 
                    <DetailEventDialog 
                      clientName={this.state.detailEvent.client_name} 
                      location={this.state.detailEvent.location}
                      duration={this.state.detailEvent.duration}
                      staffName={this.state.detailEvent.staff_name}
                      startTime={this.state.detailEvent.start}
                      id={this.state.detailEvent.id}
                      closeDetailEvent = {() => this.setState({isDetailEvent: false})}
                      getIDEventDelete = {this.getIDEventDelete}
                      updateEvent = {this.updateEvent}
                      />}
            </div>
        );
    }
}

export default withStyles(styles)(Home);