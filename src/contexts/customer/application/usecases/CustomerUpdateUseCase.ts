import { Service, Token } from "typedi";
import { ICommandHandler } from "../../../shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { ICustomerUpdateUseCase } from '../interfaces/ICustomerUpdateUseCase';
import { CustomerData } from "../dtos/CustomerData";
import { UpdateCustomerCommand } from "../commands/UpdateCustomerCommand";
import { CustomerConfirmation } from "../dtos/CustomerConfirmation";

export const ICustomerUpdateUseCaseToken = new Token<ICustomerUpdateUseCase>();

@Service(ICustomerUpdateUseCaseToken)
export class CustomerUpdateUseCase implements ICustomerUpdateUseCase {
    constructor(
        private commandHandler: ICommandHandler<UpdateCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>
    ) {}

    async updateCustomer(data: CustomerData): Promise<CustomerData> {
        const command = new UpdateCustomerCommand(data);
        const commandResult = await this.commandHandler.handle(command);

        if (!commandResult.result || !commandResult.value.customer) {
            throw new Error( "Error al actualizar el cliente");
        }
        return commandResult.value.customer;
    }
}
