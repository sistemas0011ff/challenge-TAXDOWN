import { CustomerCreditUseCase } from '../../../../../contexts/customer/application/usecases/CustomerCreditUseCase';
import { ICommandHandler } from '../../../../../contexts/shared/cqrs/ICommandHandler';
import { ICommandResult } from '../../../../../contexts/shared/cqrs/ICommandResult';
import { AddCreditCommand } from '../../../../../contexts/customer/application/commands/AddCreditCommand';
import { CustomerConfirmation } from '../../../../../contexts/customer/application/dtos/CustomerConfirmation';

describe('CustomerCreditUseCase', () => {
    let customerCreditUseCase: CustomerCreditUseCase;
    let mockCommandHandler: jest.Mocked<ICommandHandler<AddCreditCommand, ICommandResult<boolean, CustomerConfirmation>>>;

    beforeEach(() => {
        mockCommandHandler = {
            handle: jest.fn(),
        } as jest.Mocked<ICommandHandler<AddCreditCommand, ICommandResult<boolean, CustomerConfirmation>>>;

        customerCreditUseCase = new CustomerCreditUseCase(mockCommandHandler);
    });

    it('debería añadir crédito correctamente', async () => {
        const customerId = 1;
        const creditAmount = 1000;

        const customerConfirmation: CustomerConfirmation = {
            success: true,
            responseCode: '200',
            message: 'Crédito añadido correctamente',
            customerId: '1',
        };

        mockCommandHandler.handle.mockResolvedValue({
            result: true,
            value: customerConfirmation,
        });

        const result = await customerCreditUseCase.addCredit(customerId, creditAmount);

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new AddCreditCommand(customerId, creditAmount));
        expect(result).toEqual(customerConfirmation);
    });

    it('debería lanzar un error si el monto de crédito es menor o igual a 0', async () => {
        const customerId = 1;
        const creditAmount = 0;

        await expect(customerCreditUseCase.addCredit(customerId, creditAmount)).rejects.toThrow("El monto de crédito debe ser mayor a 0");

        expect(mockCommandHandler.handle).not.toHaveBeenCalled();
    });

    it('debería lanzar un error si el comando falla', async () => {
        const customerId = 1;
        const creditAmount = 1000;

        mockCommandHandler.handle.mockResolvedValue({
            result: false,
            value: {
                success: false,
                responseCode: '500',
                message: 'Error al añadir crédito al cliente',
            } as CustomerConfirmation,
        });

        await expect(customerCreditUseCase.addCredit(customerId, creditAmount)).rejects.toThrow("Error al añadir crédito al cliente");

        expect(mockCommandHandler.handle).toHaveBeenCalledWith(new AddCreditCommand(customerId, creditAmount));
    });
});
