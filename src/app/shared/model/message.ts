import { Company } from "./company";

export interface Message {
    id: number;
    sender_id: number;
    name: string;
    photo_url: string;
    email: string;
    receiver_id: number;
    message: string;
    created_at: string;
    updated_at: string;
}
