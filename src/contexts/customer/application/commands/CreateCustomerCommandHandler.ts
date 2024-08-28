import { ICommandHandler } from "../../../shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { CreateCustomerCommand } from "./CreateCustomerCommand";
import { CustomerConfirmation } from "../dtos/CustomerConfirmation";
import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository";
import { Service } from 'typedi';
import { CustomerData } from "../dtos/CustomerData";

@Service()
export class CreateCustomerCommandHandler implements ICommandHandler<CreateCustomerCommand, ICommandResult<boolean, CustomerConfirmation>> {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    async handle(command: CreateCustomerCommand): Promise<ICommandResult<boolean, CustomerConfirmation>> {
        try {
            // Utilizando CustomerData como entidad directamente
            const customerData = new CustomerData({
                id: command.customerData.id,
                name: command.customerData.name,
                email: command.customerData.email,
                phoneNumber: command.customerData.phoneNumber,
                address: command.customerData.address,
                availableCredit: command.customerData.availableCredit,
                created: command.customerData.created,
                edited: command.customerData.edited 
            });

            const customerId = await this.customerRepository.save(customerData);

            return {
                result: true,
                value: {
                    success: true,
                    responseCode: "0",
                    message: "Cliente creado con éxito", 
                    customerId: customerId,
                    customer: customerData
                }
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return {
                result: false,
                value: {
                    success: false,
                    responseCode: "1",
                    message: message, 
                }
            };
        }
    }
}
