import { firestoreDB } from '../global/firebase';
import { school_id } from '../global/constants';


export function sayHello() {
  return Math.random() < 0.5 ? 'Hello' : 'Hola';
}

export function statusController(){
  var requests = firestoreDB.collection(`/schools/${school_id}/requests`);
  var query = requests.where("datefilming", "==", "2001-10-05");
  var gearStatusID ={}
  firestoreDB.collection(`/schools/${school_id}/requests`).where("datefilming", "==", "2001-10-5")
    .get()
    .then(function(querySnapshot) {
      console.log('querySnapshot', querySnapshot)
     
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        gearStatusID = doc.id
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});

    
  


  //   generateGearById(gear: Gear[]){
  //     const gear_by_id  = {};
  //     gear.forEach(gearitem => {
  //         gear_by_id[gearitem.id] = gearitem;
  //         console.log(gearitem, "here")
  //     });
  //     return gear_by_id;
  // }
}
