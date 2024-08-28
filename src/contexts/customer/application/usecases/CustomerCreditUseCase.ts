import { Service, Token } from "typedi";
import { ICommandHandler } from "../../../shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { ICustomerCreditUseCase } from '../interfaces/ICustomerCreditUseCase';
import { AddCreditCommand } from "../commands/AddCreditCommand";
import { CustomerConfirmation } from "../dtos/CustomerConfirmation"; 

export const ICustomerCreditUseCaseToken = new Token<ICustomerCreditUseCase>();

@Service(ICustomerCreditUseCaseToken)
export class CustomerCreditUseCase implements ICustomerCreditUseCase {
    constructor(
        private commandHandler: ICommandHandler<AddCreditCommand, ICommandResult<boolean, CustomerConfirmation>>
    ) {}

    async addCredit(customerId: number, creditAmount: number): Promise<CustomerConfirmation> { // Cambia a CustomerConfirmation
        
        if (creditAmount <= 0) {
            throw new Error("El monto de crédito debe ser mayor a 0");
        }

        const command = new AddCreditCommand(customerId, creditAmount);
        const commandResult = await this.commandHandler.handle(command);

        if (!commandResult.result || !commandResult.value.success) { 
            throw new Error(commandResult.value.message || "Error al añadir crédito al cliente");
        }
        return commandResult.value;
    }
}
