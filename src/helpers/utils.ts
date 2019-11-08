import { firestoreDB } from '../global/firebase';
import { school_id } from '../global/constants';
import { Requests } from '../interfaces';

export function sayHello() {
  return Math.random() < 0.5
    ? 'Hello'
    : 'Hola';
}

export function statusController(gearDate) {
  const requestedGearById = {}

  return firestoreDB

    .collection(`/schools/${school_id}/requests`)
    .where("datefilming", "==", gearDate)
    .get()
    .then(function (querySnapshot) {

      querySnapshot
        .forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots

          const request = doc.data() as Requests
          request
            .requestedGear
            .map(gear_id => console.log(gear_id))

          request
            .requestedGear
            .forEach(a => requestedGearById[a] = true)


        });
      return requestedGearById
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      return requestedGearById;
    });

  //   generateGearById(gear: Gear[]){     const gear_by_id  = {};
  // gear.forEach(gearitem => {         gear_by_id[gearitem.id] = gearitem;
  //  console.log(gearitem, "here")     });     return gear_by_id; }
}