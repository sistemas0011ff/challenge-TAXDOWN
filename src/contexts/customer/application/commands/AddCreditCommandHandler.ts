import { ICommandHandler } from "../../../shared/cqrs/ICommandHandler";
import { ICommandResult } from "../../../shared/cqrs/ICommandResult";
import { AddCreditCommand } from "./AddCreditCommand";
import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository";
import { Service } from 'typedi';
import { CustomerData } from "../dtos/CustomerData";
import { CustomerConfirmation } from "../dtos/CustomerConfirmation";

@Service()
export class AddCreditCommandHandler implements ICommandHandler<AddCreditCommand, ICommandResult<boolean, CustomerConfirmation>> {
    constructor(
        private customerRepository: ICustomerRepository
    ) {}

    async handle(command: AddCreditCommand): Promise<ICommandResult<boolean, CustomerConfirmation>> {
        try {
            // Recuperar el cliente por ID
            const customer = await this.customerRepository.findById(command.customerId);

            if (!customer) {
                return {
                    result: false,
                    value: {
                        success: false,
                        responseCode: "1",
                        message: "Cliente no encontrado."
                    }
                };
            }

            // Agregar el crédito al cliente
            customer.availableCredit += command.creditAmount;

            // Actualizar la información del cliente en la base de datos
            const updatedCustomer = await this.customerRepository.update(customer);

            return {
                result: true,
                value: {
                    success: true,
                    responseCode: "0",
                    message: "Crédito añadido con éxito",
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
