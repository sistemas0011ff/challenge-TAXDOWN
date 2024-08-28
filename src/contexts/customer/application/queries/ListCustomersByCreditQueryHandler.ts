import { Service } from "typedi";
import { IQueryHandler } from "../../../shared/cqrs/IQueryHandler";
import { ListCustomersByCreditQuery } from "./ListCustomersByCreditQuery"; 
import { CustomerData } from "../dtos/CustomerData";
import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository";

@Service()
export class ListCustomersByCreditQueryHandler implements IQueryHandler<ListCustomersByCreditQuery, CustomerData[]> {
    constructor( 
        private customerRepository: ICustomerRepository
    ) { }

    async execute(query: ListCustomersByCreditQuery): Promise<CustomerData[]> {
        const customers = await this.customerRepository.findAllOrderedByCredit();
        return customers ?? [];  
    }
}