import { CustomerData } from "../dtos/CustomerData";

export interface IRetrieveCustomerByIdUseCase {
                 
    execute(id: number): Promise<CustomerData>; 
}
