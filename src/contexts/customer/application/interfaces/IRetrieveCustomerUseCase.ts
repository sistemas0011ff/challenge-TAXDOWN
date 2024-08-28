import { CustomerData } from "../dtos/CustomerData";

export interface IRetrieveCustomerUseCase {
    execute(): Promise<CustomerData[]>;
}
