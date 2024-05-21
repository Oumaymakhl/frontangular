import { Company } from "./company";

export interface User {
    id: number;
        nom: string;
        prenom: string;
        login: string;
        password: string;
        email: string;
        profile_photo:string;
        created_at: string;
        updated_at: string;
        company_id: number;
        remember_token: string 
        company?: Company; 
}
