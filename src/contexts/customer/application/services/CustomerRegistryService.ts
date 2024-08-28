import { Service } from 'typedi';
import { CustomerData } from '../dtos/CustomerData';
import { ICustomerCreationUseCase } from '../interfaces/ICustomerCreationUseCase';
import { ICustomerRegistryService } from '../interfaces/ICustomerRegistryService';
import { IRetrieveCustomerUseCase } from '../interfaces/IRetrieveCustomerUseCase';
import { IRetrieveCustomerByIdUseCase } from '../interfaces/IRetrieveCustomerByIdUseCase';
import { ICustomerUpdateUseCase } from '../interfaces/ICustomerUpdateUseCase';
import { ICustomerDeleteUseCase } from '../interfaces/ICustomerDeleteUseCase';
import { ICustomerCreditUseCase } from '../interfaces/ICustomerCreditUseCase';
import { IListCustomersByCreditUseCase } from '../interfaces/IListCustomersByCreditUseCase';
import { CustomerConfirmation } from '../dtos/CustomerConfirmation';

@Service()
export class CustomerRegistryService implements ICustomerRegistryService {
    constructor(
        private customerCreationUseCase: ICustomerCreationUseCase,
        private retrieveCustomerUseCase: IRetrieveCustomerUseCase,
        private retrieveCustomerByIdUseCase: IRetrieveCustomerByIdUseCase,
        private customerUpdateUseCase: ICustomerUpdateUseCase,
        private customerDeleteUseCase: ICustomerDeleteUseCase,
        private customerCreditUseCase: ICustomerCreditUseCase,
        private listCustomersByCreditUseCase: IListCustomersByCreditUseCase 
    ) {}

    async createCustomer(data: CustomerData): Promise<CustomerData> {
        return await this.customerCreationUseCase.createCustomer(data);
    }

    async listCustomers(): Promise<CustomerData[]> {
        return await this.retrieveCustomerUseCase.execute();
    }

    async listCustomersOrderedByCredit(): Promise<CustomerData[]> { 
        return await this.listCustomersByCreditUseCase.execute();
    }

    async getCustomerById(id: number): Promise<CustomerData | null> {
        return await this.retrieveCustomerByIdUseCase.execute(id);
    }

    async updateCustomer(data: CustomerData): Promise<CustomerData> {
        return await this.customerUpdateUseCase.updateCustomer(data);
    }

    async deleteCustomer(id: number): Promise<void> {
        return await this.customerDeleteUseCase.deleteCustomer(id);
    }

    async addCredit(customerId: number, creditAmount: number): Promise<CustomerConfirmation> {
        return await this.customerCreditUseCase.addCredit(customerId, creditAmount);
    }
}
