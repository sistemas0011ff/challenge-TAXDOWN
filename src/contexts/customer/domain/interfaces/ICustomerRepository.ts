import { CustomerData } from "../../application/dtos/CustomerData";

export interface ICustomerRepository {
    save(customer: CustomerData): Promise<string>;   
    findById(id: number): Promise<CustomerData | null>;  
    findAll(): Promise<CustomerData[]>;  
    findAllOrderedByCredit(): Promise<CustomerData[]>;  
    update(customer: CustomerData): Promise<CustomerData>;  
    addCredit(customerId: number, creditAmount: number): Promise<CustomerData>;  
    delete(id: number): Promise<void>;  
}
