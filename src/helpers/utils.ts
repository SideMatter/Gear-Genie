import { firestoreDB } from '../global/firebase';
import { school_id } from '../global/constants';


export function sayHello() {
  return Math.random() < 0.5 ? 'Hello' : 'Hola';
}
export function gearStatusController(){
  var requests = firestoreDB.collection(`/schools/${school_id}/requests`);
  var query = requests.where("datefilming", "==", "2001-10-5");
  firestoreDB.collection(`/schools/${school_id}/requests`).where("datefilming", "==", "2001-10-5")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  



}
