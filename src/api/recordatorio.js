import axios from "axios";
import { URL } from "../constants/constants";

const recordatorio = axios.create({
    baseURL: `${URL}/finanzas/api/v1/recordatorio/`,
});

export const NotificationBill = (id) => recordatorio.post('', id)