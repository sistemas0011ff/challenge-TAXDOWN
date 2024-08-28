import { PrismaClient, Customer } from '@prisma/client';
import { CustomerRepository } from '../../../../../contexts/customer/infraestructure/repositories/CustomerRepository';
import { CustomerData } from '../../../../../contexts/customer/application/dtos/CustomerData';

describe('CustomerRepository', () => {
    let customerRepository: CustomerRepository;
    let prisma: PrismaClient;

    beforeEach(() => {
        prisma = new PrismaClient();
        customerRepository = new CustomerRepository(prisma);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('debería guardar un cliente correctamente', async () => {
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
    
        const mockCreate = jest.spyOn(prisma.customer, 'create').mockResolvedValue({
            id: customerData.id, // Esta línea está correcta
            name: customerData.name,
            email: customerData.email,
            phoneNumber: customerData.phoneNumber,
            address: customerData.address,
            availableCredit: customerData.availableCredit,
            created: customerData.created,   
            edited: customerData.edited  
        } as Customer);
    
        const result = await customerRepository.save(customerData);
    
        expect(mockCreate).toHaveBeenCalledWith({
            data: {
                name: customerData.name,
                email: customerData.email,
                phoneNumber: customerData.phoneNumber,
                address: customerData.address,
                availableCredit: customerData.availableCredit,
                created: customerData.created,
                edited: customerData.edited,
            },
        });
        expect(result).toBe(customerData.id.toString());
    });
    

    it('debería encontrar un cliente por ID correctamente', async () => {
        const customerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };

        const mockFindUnique = jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(customerData as Customer);

        const result = await customerRepository.findById(1);

        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(result).toEqual(expect.objectContaining(customerData));
    });

    it('debería retornar null si no encuentra un cliente por ID', async () => {
        const mockFindUnique = jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(null);

        const result = await customerRepository.findById(1);

        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(result).toBeNull();
    });

    it('debería encontrar todos los clientes correctamente', async () => {
        const customerList = [
            {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                address: '123 Main St',
                availableCredit: 1000,
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

        const mockFindMany = jest.spyOn(prisma.customer, 'findMany').mockResolvedValue(customerList as Customer[]);

        const result = await customerRepository.findAll();

        expect(mockFindMany).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(expect.objectContaining(customerList[0]));
        expect(result[1]).toEqual(expect.objectContaining(customerList[1]));
    });

    it('debería actualizar un cliente correctamente', async () => {
        const customerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };

        const mockUpdate = jest.spyOn(prisma.customer, 'update').mockResolvedValue(customerData as Customer);

        const result = await customerRepository.update(customerData);

        expect(mockUpdate).toHaveBeenCalledWith({
            where: { id: customerData.id },
            data: {
                name: customerData.name,
                email: customerData.email,
                phoneNumber: customerData.phoneNumber,
                address: customerData.address,
                availableCredit: customerData.availableCredit,
                edited: expect.any(Date),
            },
        });
        expect(result).toEqual(expect.objectContaining(customerData));
    });

    it('debería eliminar un cliente correctamente', async () => {
        const mockDelete = jest.spyOn(prisma.customer, 'delete').mockResolvedValue({} as Customer);

        await customerRepository.delete(1);

        expect(mockDelete).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    });

    it('debería añadir crédito a un cliente correctamente', async () => {
        const customerData = {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St',
            availableCredit: 1000,
            created: new Date(),
            edited: new Date(),
        };

        const mockFindUnique = jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(customerData as Customer);
        const mockUpdate = jest.spyOn(prisma.customer, 'update').mockResolvedValue({
            ...customerData,
            availableCredit: customerData.availableCredit + 500,
        } as Customer);

        const result = await customerRepository.addCredit(1, 500);

        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(mockUpdate).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                availableCredit: customerData.availableCredit + 500,
                edited: expect.any(Date),
            },
        });
        expect(result.availableCredit).toBe(1500);
    });

    it('debería lanzar un error si el cliente no existe al añadir crédito', async () => {
        const mockFindUnique = jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(null);

        await expect(customerRepository.addCredit(1, 500)).rejects.toThrow('Cliente no encontrado');

        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    });

    it('debería listar todos los clientes ordenados por crédito correctamente', async () => {
        const customerList = [
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
            {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                phoneNumber: '1234567890',
                address: '123 Main St',
                availableCredit: 1000,
                created: new Date(),
                edited: new Date(),
            },
        ];

        const mockFindMany = jest.spyOn(prisma.customer, 'findMany').mockResolvedValue(customerList as Customer[]);

        const result = await customerRepository.findAllOrderedByCredit();

        expect(mockFindMany).toHaveBeenCalledWith({
            orderBy: { availableCredit: 'desc' },
        });
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(expect.objectContaining(customerList[0]));
        expect(result[1]).toEqual(expect.objectContaining(customerList[1]));
    });
});
