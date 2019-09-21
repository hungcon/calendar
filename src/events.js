import {firebaseConnect} from './firebaseConnect';
var events = [];
const db = firebaseConnect.firestore();
  db.collection('events').get().then(function(snapshot){
    const data = snapshot.docs.map(doc => doc.data());
   var user = localStorage.getItem('email');
    data.forEach((value) => {
      if(user === value.user){
        var eventItem = {
            id: value.id,
          title: "Hẹn với " + value.client_name,
          start: new Date(value.start_time.seconds*1000),
          end: new Date(value.start_time.seconds*1000 + value.duration*3600000),
        }
        events.push(eventItem);
      }
    });
})
export const data = events;