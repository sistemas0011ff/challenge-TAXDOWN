import { CustomerData } from "./CustomerData";
 
export interface CustomerConfirmation {
    success: boolean;
    responseCode: string;
    message: string;
    customerId?: string;
    customer?: CustomerData;
}
