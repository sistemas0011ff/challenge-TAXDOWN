import { CustomerData } from "../dtos/CustomerData";

export interface IListCustomersByCreditUseCase {
    execute(): Promise<CustomerData[]>;
}