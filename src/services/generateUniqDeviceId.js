import { v4 as uuidv4 } from "uuid";

export default function generateUserDevice() {
    const device_id = localStorage.getItem('device_id');
    if (!device_id) {
        localStorage.setItem('device_id',uuidv4())
    }
}
