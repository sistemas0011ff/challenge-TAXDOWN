import { CustomerDeleteUseCase } from '../../../../../contexts/customer/application/usecases/CustomerDeleteUseCase';
import { ICommandHandler } from '../../../../../contexts/shared/cqrs/ICommandHandler';
import { ICommandResult } from '../../../../../contexts/shared/cqrs/ICommandResult';
import { DeleteCustomerCommand } from '../../../../../contexts/customer/application/commands/DeleteCustomerCommand';
import { CustomerConfirmation } from '../../../../../contexts/customer/application/dtos/CustomerConfirmation';

describe('CustomerDeleteUseCase', () => {
    let customerDeleteUseCase: CustomerDeleteUseCase;
    let mockCommandHandler: jest.Mocked<ICommandHandler<DeleteCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>>;

    beforeEach(() => {
        mockCommandHandler = {
            handle: jest.fn(),
        } as jest.Mocked<ICommandHandler<DeleteCustomerCommand, ICommandResult<boolean, CustomerConfirmation>>>;

        customerDeleteUseCase = new CustomerDeleteUseCase(mockCommandHandler);
    });

    it('debería eliminar un cliente correctamente', async () => {
        const customerId = 1;

        const customerConfirmation: CustomerConfirmation = {
            success: true,
            responseCode: '200',
            message: 'Cliente eliminado correctamente',
        };

        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: customerConfirmation,
        });

        await customerDeleteUseCase.deleteCustomer(customerId);

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new DeleteCustomerCommand(customerId));
    });

    it('debería lanzar un error si la eliminación del cliente falla', async () => {
        const customerId = 1;

        mockCommandHandler.handle.mockResolvedValue({
            result: false,
            value: {
                success: false,
                responseCode: '500',
                message: 'Error al eliminar el cliente',
            } as CustomerConfirmation,
        });

        await expect(customerDeleteUseCase.deleteCustomer(customerId)).rejects.toThrow("Error al eliminar el cliente");

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new DeleteCustomerCommand(customerId));
    });
});