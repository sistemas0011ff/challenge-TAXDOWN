import { ICommandHandler } from "../../../../../contexts/shared/cqrs/ICommandHandler";
import { CustomerCreationUseCase } from "../../../../../contexts/customer/application/usecases/CustomerCreationUseCase";
import { CreateCustomerCommand } from "../../../../../contexts/customer/application/commands/CreateCustomerCommand";
import { ICommandResult } from "../../../../../contexts/shared/cqrs/ICommandResult";
import { CustomerConfirmation } from "../../../../../contexts/customer/application/dtos/CustomerConfirmation";
import { CustomerData } from "../../../../../contexts/customer/application/dtos/CustomerData";

describe('CustomerCreationUseCase', () => {
    let customerCreationUseCase: CustomerCreationUseCase;
    let mockCommandHandler: jest.Mocked<ICommandHandler<CreateCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>>;

    beforeEach(() => {
        mockCommandHandler = {
            handle: jest.fn(),
        } as jest.Mocked<ICommandHandler<CreateCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>>;

        customerCreationUseCase = new CustomerCreationUseCase(mockCommandHandler);
    });

    it('debería crear un cliente correctamente', async () => {
        const customerData: CustomerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };

        const customerConfirmation: CustomerConfirmation = {
            success: true,
            responseCode: '200',
            message: 'Cliente creado correctamente',
            customerId: '1',
            customer: customerData,
        };

        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: customerConfirmation,
        });

        const result = await customerCreationUseCase.createCustomer(customerData);

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new CreateCustomerCommand(customerData));
        expect(result).toEqual(customerData);
    });

    it('debería lanzar un error si la creación del cliente falla', async () => {
        const customerData: CustomerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };

        mockCommandHandler.handle.mockResolvedValue({
            result: false,
            value: {
                success: false,
                responseCode: '500',
                message: 'Error al crear el cliente',
            } as CustomerConfirmation,
        });

        await expect(customerCreationUseCase.createCustomer(customerData)).rejects.toThrow("Error al crear el cliente");

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new CreateCustomerCommand(customerData));
    });

    it('debería lanzar un error si no se devuelve el cliente creado', async () => {
        const customerData: CustomerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };

        // Simulando que el cliente no se devuelve, pero el resultado es exitoso.
        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: {
                success: true,
                responseCode: '200',
                message: 'Cliente creado correctamente',
                customerId: '1',
                customer: undefined, // Simulando que no se devuelve el cliente
            } as CustomerConfirmation,
        });

        await expect(customerCreationUseCase.createCustomer(customerData)).rejects.toThrow(
            "Error al crear el cliente"
        );

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new CreateCustomerCommand(customerData));
    });
});
