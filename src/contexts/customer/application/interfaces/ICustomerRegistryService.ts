import { CustomerConfirmation } from '../dtos/CustomerConfirmation';
import { CustomerData } from '../dtos/CustomerData';

export interface ICustomerRegistryService {
    createCustomer(data: CustomerData): Promise<CustomerData>;
    listCustomers(): Promise<CustomerData[]>;
    getCustomerById(id: number): Promise<CustomerData | null>;
    updateCustomer(data: CustomerData): Promise<CustomerData>;
    deleteCustomer(id: number): Promise<void>;
    addCredit(customerId: number, creditAmount: number): Promise<CustomerConfirmation>;
    listCustomersOrderedByCredit(): Promise<CustomerData[]>; 
}
