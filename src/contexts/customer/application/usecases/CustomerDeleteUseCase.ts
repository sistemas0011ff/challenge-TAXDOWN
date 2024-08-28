import { Service, Token } from "typedi";
import { ICommandHandler } from "../../../shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { ICustomerDeleteUseCase } from '../interfaces/ICustomerDeleteUseCase';
import { DeleteCustomerCommand } from "../commands/DeleteCustomerCommand";
import { CustomerConfirmation } from "../dtos/CustomerConfirmation";

export const ICustomerDeleteUseCaseToken = new Token<ICustomerDeleteUseCase>();

@Service(ICustomerDeleteUseCaseToken)
export class CustomerDeleteUseCase implements ICustomerDeleteUseCase {
    constructor(
        private commandHandler: ICommandHandler<DeleteCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>
    ) {}

    async deleteCustomer(id: number): Promise<void> {
        const command = new DeleteCustomerCommand(id);
        const commandResult = await this.commandHandler.handle(command);

        if (!commandResult.result || !commandResult.value.success) {
            throw new Error(commandResult.value.message || "Error al eliminar el cliente");
        }
    }
}
