import { Service, Token } from "typedi";
import { ICommandHandler } from "../../../shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult"; 
import { ICustomerCreationUseCase } from '../interfaces/ICustomerCreationUseCase'; 

import { CustomerData } from "../dtos/CustomerData";
import { CreateCustomerCommand } from "../commands/CreateCustomerCommand";
import { CustomerConfirmation } from "../dtos/CustomerConfirmation";

const ICustomerCreationUseCaseToken = new Token<ICustomerCreationUseCase>();

@Service(ICustomerCreationUseCaseToken)
export class CustomerCreationUseCase implements ICustomerCreationUseCase {

    constructor(
        private commandHandler: ICommandHandler<CreateCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>
    ) {}

    async createCustomer(data: CustomerData): Promise<CustomerData> {
        const command = new CreateCustomerCommand(data); 
        const commandResult = await this.commandHandler.handle(command);

        if (!commandResult.result || !commandResult.value.customer) {
            throw new Error("Error al crear el cliente");
        }
        return commandResult.value.customer;
    }
}