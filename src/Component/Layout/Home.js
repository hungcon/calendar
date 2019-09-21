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
 import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {data} from '../../events'
  // const events = [];
  //     const db = firebaseConnect.firestore();
  //       db.collection('events').get().then(function(snapshot){
  //         const data = snapshot.docs.map(doc => doc.data());
        
  //         data.forEach((value) => {
  //         //  console.log(localStorage.getItem('email') === value.user)
  //           if(localStorage.getItem('email') === value.user){
  //             var eventItem = {
  //               title: "Hẹn với " + value.client_name,
  //               start: new Date(value.start_time.seconds*1000),
  //               end: new Date(value.start_time.seconds*1000 + value.duration*3600000),
  //             }
  //             events.push(eventItem);
  //           }
  //         });
  //     })
      // this.setState({events: events});

const localizer = momentLocalizer(moment); 
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {
                anchorEl: null
              },
              events: data,
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
      console.log("will")
    }
    componentDidMount() {
      console.log('Home')
      
    }

    shouldComponentUpdate(nextProps, nextState) {
      if(this.props.history.path === nextProps.history.path) return true;
      return false;
    }
  
    eventFun = () => {
      //hiện lên bảng sửa chữa
    }
    render() {
      console.log("render");

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
                    <div style={{ height: '500pt'}}> 
                        <Calendar
                        events={this.state.events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={moment().toDate()}
                        localizer={localizer}
                        onSelectEvent={this.eventFun()}
                        />
                     </div>
                </Container>   
            </div>
        );
    }
}

export default Home;