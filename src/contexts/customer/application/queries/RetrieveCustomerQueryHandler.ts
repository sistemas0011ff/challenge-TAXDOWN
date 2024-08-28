import { Service } from "typedi";
import { IQueryHandler } from "../../../shared/cqrs/IQueryHandler";
import { CustomerQueryValues } from "./CustomerQueryValues"; 
import { CustomerData } from "../dtos/CustomerData";
import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository";

@Service()
export class RetrieveCustomerQueryHandler implements IQueryHandler<CustomerQueryValues, CustomerData[]> {
    constructor( 
        private customerRepository: ICustomerRepository
    ) { }

    async execute(query: CustomerQueryValues): Promise<CustomerData[]> {
        const customers = await this.customerRepository.findAll();
        return customers ?? [];  
    }
}
