import { ListCustomersByCreditUseCase } from '../../../../../contexts/customer/application/usecases/ListCustomersByCreditUseCase';
import { IQueryHandler } from '../../../../../contexts/shared/cqrs/IQueryHandler';
import { ListCustomersByCreditQuery } from '../../../../../contexts/customer/application/queries/ListCustomersByCreditQuery';
import { CustomerData } from '../../../../../contexts/customer/application/dtos/CustomerData';

describe('ListCustomersByCreditUseCase', () => {
    let listCustomersByCreditUseCase: ListCustomersByCreditUseCase;
    let mockCustomerQueryHandler: jest.Mocked<IQueryHandler<ListCustomersByCreditQuery, CustomerData[]>>;

    beforeEach(() => {
        mockCustomerQueryHandler = {
            execute: jest.fn(),
        } as jest.Mocked<IQueryHandler<ListCustomersByCreditQuery, CustomerData[]>>;

        listCustomersByCreditUseCase = new ListCustomersByCreditUseCase(mockCustomerQueryHandler);
    });

    it('debería listar clientes ordenados por crédito correctamente', async () => {
        const mockCustomers: CustomerData[] = [
            {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                address: '123 Main St',
                availableCredit: 1500,
                created: new Date(),
                edited: new Date(),
            },
            {
                id: 2,
                name: 'Jane Doe',
                email: 'janedoe@example.com',
                phoneNumber: '0987654321',
                address: '456 Elm St',
                availableCredit: 2000,
                created: new Date(),
                edited: new Date(),
            },
        ];

        mockCustomerQueryHandler.execute.mockResolvedValue(mockCustomers);

        const result = await listCustomersByCreditUseCase.execute();

        expect(mockCustomerQueryHandler.execute).toHaveBeenCalledWith(new ListCustomersByCreditQuery());
        expect(result).toEqual(mockCustomers);
    });

    it('debería lanzar un error si la consulta falla', async () => {
        mockCustomerQueryHandler.execute.mockRejectedValue(new Error('Error al consultar los clientes'));

        await expect(listCustomersByCreditUseCase.execute()).rejects.toThrow('Error al consultar los clientes');

        expect(mockCustomerQueryHandler.execute).toHaveBeenCalledWith(new ListCustomersByCreditQuery());
    });
});