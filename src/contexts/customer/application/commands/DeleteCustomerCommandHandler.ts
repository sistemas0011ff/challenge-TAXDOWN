import { ICommandHandler } from "../../../shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { DeleteCustomerCommand } from "./DeleteCustomerCommand";
import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository";
import { Service } from 'typedi';
import { CustomerConfirmation } from "../dtos/CustomerConfirmation";

@Service()
export class DeleteCustomerCommandHandler implements ICommandHandler<DeleteCustomerCommand, ICommandResult<boolean, CustomerConfirmation>> {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    async handle(command: DeleteCustomerCommand): Promise<ICommandResult<boolean, CustomerConfirmation>> {
        try {
            await this.customerRepository.delete(command.customerId);

            return {
                result: true,
                value: {
                    success: true,
                    responseCode: "0",
                    message: "Cliente eliminado con éxito",
                    customerId: command.customerId.toString(),
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
