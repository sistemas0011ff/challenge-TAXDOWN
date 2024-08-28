import { Service } from "typedi";
import { IQueryHandler } from "../../../shared/cqrs/IQueryHandler"; 
import { CustomerData } from "../dtos/CustomerData";
import { IListCustomersByCreditUseCase } from "../interfaces/IListCustomersByCreditUseCase";
import { ListCustomersByCreditQuery } from "../queries/ListCustomersByCreditQuery"; 

@Service()
export class ListCustomersByCreditUseCase implements IListCustomersByCreditUseCase {

    constructor(
        private customerQueryHandler: IQueryHandler<ListCustomersByCreditQuery, CustomerData[]>
    ) {}

    async execute(): Promise<CustomerData[]> {
        const query = new ListCustomersByCreditQuery();
        return await this.customerQueryHandler.execute(query);
    }
}