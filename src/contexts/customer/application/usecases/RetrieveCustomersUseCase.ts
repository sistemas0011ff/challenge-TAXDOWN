import { Service } from "typedi";
import { IQueryHandler } from "../../../shared/cqrs/IQueryHandler"; 
import { CustomerData } from "../dtos/CustomerData";
import { IRetrieveCustomerUseCase } from "../interfaces/IRetrieveCustomerUseCase";
import { CustomerQueryValues } from "../queries/CustomerQueryValues"; 

@Service()
export class RetrieveCustomersUseCase implements IRetrieveCustomerUseCase {

    constructor(
        private customerQueryHandler: IQueryHandler<CustomerQueryValues, CustomerData[]>
    ) {}

    async execute(): Promise<CustomerData[]> {
        const query = new CustomerQueryValues();
        return await this.customerQueryHandler.execute(query);
    }
}
