export interface ICustomerDeleteUseCase {
    deleteCustomer(id: number): Promise<void>;
}