import { Gear } from "../interfaces";

export const school_id = '3dyMQ6jZbXYixJ5i7KB9';

export const gear_by_id = {};

export function generateGearById(gear: Gear[]){

    gear.forEach(gearitem => {
        gear_by_id[gearitem.id] = gearitem;
        console.log(gearitem, "here")
    });
    console.log("done", gear_by_id);
}

const obj = { name: 'cory'}

console.log(obj.name) //=> "cory"
console.log(obj['name'])