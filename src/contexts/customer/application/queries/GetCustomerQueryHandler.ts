import { Service } from 'typedi';
import { IQueryHandler } from '../../../shared/cqrs/IQueryHandler'; 
import { CustomerData } from '../dtos/CustomerData';
import { GetCustomerQuery } from './GetCustomerQuery';
import { ICustomerRepository } from '../../domain/interfaces/ICustomerRepository';

@Service()
export class GetCustomerQueryHandler implements IQueryHandler<GetCustomerQuery, CustomerData[]> {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    public async execute(query: GetCustomerQuery): Promise<CustomerData[]> {
        try {
            const customer = await this.customerRepository.findById(query.id); 
 
            return customer ? [customer] : [];
        } catch (error) { 
            throw error;
        }
    }
}
