import { ICommandHandler } from "../../../shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { UpdateCustomerCommand } from "./UpdateCustomerCommand";
import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository";
import { Service } from 'typedi';
import { CustomerData } from "../dtos/CustomerData"; 
import { CustomerConfirmation } from "../dtos/CustomerConfirmation";

@Service()
export class UpdateCustomerCommandHandler implements ICommandHandler<UpdateCustomerCommand, ICommandResult<boolean, CustomerConfirmation>> {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    async handle(command: UpdateCustomerCommand): Promise<ICommandResult<boolean, CustomerConfirmation>> {
        try {
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

            const updatedCustomer = await this.customerRepository.update(customerData);

            return {
                result: true,
                value: {
                    success: true,
                    responseCode: "0",
                    message: "Cliente actualizado con éxito",
                    customerId: updatedCustomer.id.toString(),
                    customer: updatedCustomer
                }
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            return {
                result: false,
                value: {
                    success: false,
                    responseCode: "1",
                    message: message
                }
            };
        }
    }
}
