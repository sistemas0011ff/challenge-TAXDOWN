
import { CustomerData } from "../dtos/CustomerData";

export interface ICustomerCreationUseCase {
    createCustomer(data: CustomerData): Promise<CustomerData>;
  }