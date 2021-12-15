import { Role } from "./role.model";

export class User {
    id?: number;
    username?: string;
    phone?: string;
    department?: string;
    company?: string;
    roles?: Role[];
    averageRate?: number;
    numberSignedEvents?: number;
}