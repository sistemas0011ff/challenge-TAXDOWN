import { CustomerData } from "../dtos/CustomerData";

export interface ICustomerUpdateUseCase {
    updateCustomer(data: CustomerData): Promise<CustomerData>;
}
