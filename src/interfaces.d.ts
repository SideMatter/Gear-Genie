import { Reference } from "@firebase/database";

interface Gear {
    name: string;
    approvalNeeded: boolean; // true/false
    type: "camera" | "microphone" | "lighting" | "other"
}
interface Requests {
    id: string;
    badgeid: string;
    requestname: string;
    trellocardlink: string;
    approval: boolean; // true/false
    datefilming: string;
    gear: Reference
    periodfilming: "A1" | "A2" | "A3" | "A4" | "B5" | "B6" | "B7" | "B8" | "After School" | "Lunch"
    type: "camera" | "microphone" | "lighting" | "other"
    status: "needs-approval" | "approved" | "denied"
}