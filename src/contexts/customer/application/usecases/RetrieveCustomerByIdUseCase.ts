import { Service } from 'typedi';
import { IRetrieveCustomerByIdUseCase } from '../interfaces/IRetrieveCustomerByIdUseCase';
import { ICustomerRepository } from '../../domain/interfaces/ICustomerRepository';
import { CustomerData } from '../dtos/CustomerData';

@Service()
export class RetrieveCustomerByIdUseCase implements IRetrieveCustomerByIdUseCase {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    async execute(id: number): Promise<CustomerData> {
        const customer = await this.customerRepository.findById(id);
        
        if (!customer) {
            throw new Error(`Cliente con ID ${id} no encontrado.`);
        }

        return customer;
    }
}
