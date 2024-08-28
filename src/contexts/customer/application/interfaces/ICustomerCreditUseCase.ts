import { CustomerConfirmation } from "../dtos/CustomerConfirmation";

export interface ICustomerCreditUseCase {
    addCredit(customerId: number, creditAmount: number): Promise<CustomerConfirmation>;
}
