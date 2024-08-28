import { CustomerData } from '../../../../../contexts/customer/application/dtos/CustomerData';
import { CustomerConfirmation } from '../../../../../contexts/customer/application/dtos/CustomerConfirmation';
import { ICustomerCreationUseCase } from '../../../../../contexts/customer/application/interfaces/ICustomerCreationUseCase';
import { IRetrieveCustomerUseCase } from '../../../../../contexts/customer/application/interfaces/IRetrieveCustomerUseCase';
import { IRetrieveCustomerByIdUseCase } from '../../../../../contexts/customer/application/interfaces/IRetrieveCustomerByIdUseCase';
import { ICustomerUpdateUseCase } from '../../../../../contexts/customer/application/interfaces/ICustomerUpdateUseCase';
import { ICustomerDeleteUseCase } from '../../../../../contexts/customer/application/interfaces/ICustomerDeleteUseCase';
import { ICustomerCreditUseCase } from '../../../../../contexts/customer/application/interfaces/ICustomerCreditUseCase';
import { IListCustomersByCreditUseCase } from '../../../../../contexts/customer/application/interfaces/IListCustomersByCreditUseCase';
import { CustomerRegistryService } from '../../../../../contexts/customer/application/services/CustomerRegistryService';

jest.mock('../../../../../contexts/customer/application/interfaces/ICustomerCreationUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/IRetrieveCustomerUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/IRetrieveCustomerByIdUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/ICustomerUpdateUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/ICustomerDeleteUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/ICustomerCreditUseCase');
jest.mock('../../../../../contexts/customer/application/interfaces/IListCustomersByCreditUseCase');

describe('CustomerRegistryService', () => {
  let service: CustomerRegistryService;
  let mockCustomerCreationUseCase: jest.Mocked<ICustomerCreationUseCase>;
  let mockRetrieveCustomerUseCase: jest.Mocked<IRetrieveCustomerUseCase>;
  let mockRetrieveCustomerByIdUseCase: jest.Mocked<IRetrieveCustomerByIdUseCase>;
  let mockCustomerUpdateUseCase: jest.Mocked<ICustomerUpdateUseCase>;
  let mockCustomerDeleteUseCase: jest.Mocked<ICustomerDeleteUseCase>;
  let mockCustomerCreditUseCase: jest.Mocked<ICustomerCreditUseCase>;
  let mockListCustomersByCreditUseCase: jest.Mocked<IListCustomersByCreditUseCase>;

  beforeEach(() => {
    mockCustomerCreationUseCase = {
      createCustomer: jest.fn(),
    } as jest.Mocked<ICustomerCreationUseCase>;

    mockRetrieveCustomerUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<IRetrieveCustomerUseCase>;

    mockRetrieveCustomerByIdUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<IRetrieveCustomerByIdUseCase>;

    mockCustomerUpdateUseCase = {
      updateCustomer: jest.fn(),
    } as jest.Mocked<ICustomerUpdateUseCase>;

    mockCustomerDeleteUseCase = {
      deleteCustomer: jest.fn(),
    } as jest.Mocked<ICustomerDeleteUseCase>;

    mockCustomerCreditUseCase = {
      addCredit: jest.fn(),
    } as jest.Mocked<ICustomerCreditUseCase>;

    mockListCustomersByCreditUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<IListCustomersByCreditUseCase>;

    service = new CustomerRegistryService(
      mockCustomerCreationUseCase,
      mockRetrieveCustomerUseCase,
      mockRetrieveCustomerByIdUseCase,
      mockCustomerUpdateUseCase,
      mockCustomerDeleteUseCase,
      mockCustomerCreditUseCase,
      mockListCustomersByCreditUseCase
    );
  });

  it('debería crear un cliente correctamente', async () => {
    const customerData = new CustomerData({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St',
      availableCredit: 1000,
      created: new Date(),
      edited: new Date(),
    });
    const expectedCustomer = new CustomerData({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St',
      availableCredit: 1000,
      created: new Date(),
      edited: new Date(),
    });
    mockCustomerCreationUseCase.createCustomer.mockResolvedValue(expectedCustomer);

    const result = await service.createCustomer(customerData);

    expect(mockCustomerCreationUseCase.createCustomer).toHaveBeenCalledWith(customerData);
    expect(result).toEqual(expectedCustomer);
  });

  it('debería listar clientes correctamente', async () => {
    const mockCustomers = [
      new CustomerData({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        availableCredit: 1000,
        created: new Date(),
        edited: new Date(),
      }),
      new CustomerData({
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        phoneNumber: '0987654321',
        address: '456 Elm St',
        availableCredit: 2000,
        created: new Date(),
        edited: new Date(),
      }),
    ];
    mockRetrieveCustomerUseCase.execute.mockResolvedValue(mockCustomers);

    const result = await service.listCustomers();

    expect(mockRetrieveCustomerUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(mockCustomers);
  });

  it('debería obtener un cliente por ID correctamente', async () => {
    const customerId = 1;
    const expectedCustomer = new CustomerData({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St',
      availableCredit: 1000,
      created: new Date(),
      edited: new Date(),
    });
    mockRetrieveCustomerByIdUseCase.execute.mockResolvedValue(expectedCustomer);

    const result = await service.getCustomerById(customerId);

    expect(mockRetrieveCustomerByIdUseCase.execute).toHaveBeenCalledWith(customerId);
    expect(result).toEqual(expectedCustomer);
  });

  it('debería actualizar un cliente correctamente', async () => {
    const customerData = new CustomerData({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St',
      availableCredit: 1000,
      created: new Date(),
      edited: new Date(),
    });
    const updatedCustomer = new CustomerData({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St',
      availableCredit: 1500,
      created: new Date(),
      edited: new Date(),
    });
    mockCustomerUpdateUseCase.updateCustomer.mockResolvedValue(updatedCustomer);

    const result = await service.updateCustomer(customerData);

    expect(mockCustomerUpdateUseCase.updateCustomer).toHaveBeenCalledWith(customerData);
    expect(result).toEqual(updatedCustomer);
  });

  it('debería eliminar un cliente correctamente', async () => {
    const customerId = 1;
    mockCustomerDeleteUseCase.deleteCustomer.mockResolvedValue();

    await service.deleteCustomer(customerId);

    expect(mockCustomerDeleteUseCase.deleteCustomer).toHaveBeenCalledWith(customerId);
  });

  it('debería añadir crédito a un cliente correctamente', async () => {
    const customerId = 1;
    const creditAmount = 1000;
    const expectedConfirmation: CustomerConfirmation = {
      success: true,
      responseCode: '200',
      message: 'Crédito añadido correctamente',
      customerId: customerId.toString(),
      customer: new CustomerData({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        availableCredit: 2000, // después de añadir crédito
        created: new Date(),
        edited: new Date(),
      }),
    };
    mockCustomerCreditUseCase.addCredit.mockResolvedValue(expectedConfirmation);

    const result = await service.addCredit(customerId, creditAmount);

    expect(mockCustomerCreditUseCase.addCredit).toHaveBeenCalledWith(customerId, creditAmount);
    expect(result).toEqual(expectedConfirmation);
  });

  it('debería listar clientes ordenados por crédito correctamente', async () => {
    const mockCustomers = [
      new CustomerData({
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        phoneNumber: '0987654321',
        address: '456 Elm St',
        availableCredit: 2000,
        created: new Date(),
        edited: new Date(),
      }),
      new CustomerData({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        availableCredit: 1000,
        created: new Date(),
        edited: new Date(),
      }),
    ];
    mockListCustomersByCreditUseCase.execute.mockResolvedValue(mockCustomers);

    const result = await service.listCustomersOrderedByCredit();

    expect(mockListCustomersByCreditUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(mockCustomers);
  });
});
