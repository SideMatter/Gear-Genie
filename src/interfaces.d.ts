import { Reference } from "@firebase/database";

interface Gear {
    details: string;
    multiple: any;
    name: string; //Name of the gear
    id: string; // the id of the gear
    approvalNeeded: boolean; // true/false
    type: "camera" | "microphone" | "lighting" | "other"
    
}
interface Requests {
    id: string; //The id of the request
    requestname: string; // the name of the request
    trellocardlink: string; // the link to the trello card
    approval: boolean; // Does it require approval? true/false
    datefilming: string; // the date that your filming
    requestedGear: string[]; //  list of gear ids. the gear that is requested stored via the ID with a map.... maybe, whatever is best practice.
    periodfilming: "A1" | "A2" | "A3" | "A4" | "B5" | "B6" | "B7" | "B8" | "After School" | "Lunch" // The period you are filming, can select multiple
    type: "camera" | "microphone" | "lighting" | "other" // what it is
    status: "needs-approval" | "approved" | "denied"  // Self explantory
    username: string; // the name of the requeste
    requesttype: "Check-out" | "Request"
}
interface Badges {
    day: "A-Day" | "B-Day" | "Full Time" // when do they have the class
    firebaseUUID: string, // Firebase provided user ID
    name: string, // Name
    permslevel: "Student" | "Teacher" | "Deveolper" // The Role In Class
}