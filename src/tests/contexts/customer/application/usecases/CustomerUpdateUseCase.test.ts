import { CustomerUpdateUseCase } from '../../../../../contexts/customer/application/usecases/CustomerUpdateUseCase';
import { ICommandHandler } from '../../../../../contexts/shared/cqrs/ICommandHandler';
import { ICommandResult } from '../../../../../contexts/shared/cqrs/ICommandResult';
import { UpdateCustomerCommand } from '../../../../../contexts/customer/application/commands/UpdateCustomerCommand';
import { CustomerConfirmation } from '../../../../../contexts/customer/application/dtos/CustomerConfirmation';
import { CustomerData } from '../../../../../contexts/customer/application/dtos/CustomerData';

describe('CustomerUpdateUseCase', () => {
    let customerUpdateUseCase: CustomerUpdateUseCase;
    let mockCommandHandler: jest.Mocked<ICommandHandler<UpdateCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>>;

    beforeEach(() => {
        mockCommandHandler = {
            handle: jest.fn(),
        } as jest.Mocked<ICommandHandler<UpdateCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>>;

        customerUpdateUseCase = new CustomerUpdateUseCase(mockCommandHandler);
    });

    it('debería actualizar un cliente correctamente', async () => {
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
            message: 'Cliente actualizado correctamente',
            customerId: '1',
            customer: customerData,
        };

        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: customerConfirmation,
        });

        const result = await customerUpdateUseCase.updateCustomer(customerData);

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new UpdateCustomerCommand(customerData));
        expect(result).toEqual(customerData);
    });

    it('debería lanzar un error si la actualización del cliente falla', async () => {
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
                message: 'Error al actualizar el cliente',
                customerId: '1',
            } as CustomerConfirmation,
        });

        await expect(customerUpdateUseCase.updateCustomer(customerData)).rejects.toThrow("Error al actualizar el cliente");

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new UpdateCustomerCommand(customerData));
    });

    it('debería lanzar un error si no se devuelve el cliente actualizado', async () => {
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
            result: true,
            value: {
                success: true,
                responseCode: '200',
                message: 'Cliente actualizado correctamente',
                customerId: '1',
                customer: undefined, 
            } as CustomerConfirmation,
        });

        await expect(customerUpdateUseCase.updateCustomer(customerData)).rejects.toThrow("Error al actualizar el cliente");

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new UpdateCustomerCommand(customerData));
    });
});
