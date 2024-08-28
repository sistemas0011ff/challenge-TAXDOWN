"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const CustomerRepository_1 = require("../../../../../contexts/customer/infraestructure/repositories/CustomerRepository");
describe('CustomerRepository', () => {
    let customerRepository;
    let prisma;
    beforeEach(() => {
        prisma = new client_1.PrismaClient();
        customerRepository = new CustomerRepository_1.CustomerRepository(prisma);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('debería guardar un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockCreate = jest.spyOn(prisma.customer, 'create').mockResolvedValue({
            id: customerData.id, // Esta línea está correcta
            name: customerData.name,
            email: customerData.email,
            phoneNumber: customerData.phoneNumber,
            address: customerData.address,
            availableCredit: customerData.availableCredit,
            created: customerData.created,
            edited: customerData.edited
        });
        const result = yield customerRepository.save(customerData);
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
    }));
    it('debería encontrar un cliente por ID correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockFindUnique = jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(customerData);
        const result = yield customerRepository.findById(1);
        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(result).toEqual(expect.objectContaining(customerData));
    }));
    it('debería retornar null si no encuentra un cliente por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockFindUnique = jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(null);
        const result = yield customerRepository.findById(1);
        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(result).toBeNull();
    }));
    it('debería encontrar todos los clientes correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockFindMany = jest.spyOn(prisma.customer, 'findMany').mockResolvedValue(customerList);
        const result = yield customerRepository.findAll();
        expect(mockFindMany).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(expect.objectContaining(customerList[0]));
        expect(result[1]).toEqual(expect.objectContaining(customerList[1]));
    }));
    it('debería actualizar un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockUpdate = jest.spyOn(prisma.customer, 'update').mockResolvedValue(customerData);
        const result = yield customerRepository.update(customerData);
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
    }));
    it('debería eliminar un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockDelete = jest.spyOn(prisma.customer, 'delete').mockResolvedValue({});
        yield customerRepository.delete(1);
        expect(mockDelete).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    }));
    it('debería añadir crédito a un cliente correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockFindUnique = jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(customerData);
        const mockUpdate = jest.spyOn(prisma.customer, 'update').mockResolvedValue(Object.assign(Object.assign({}, customerData), { availableCredit: customerData.availableCredit + 500 }));
        const result = yield customerRepository.addCredit(1, 500);
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
    }));
    it('debería lanzar un error si el cliente no existe al añadir crédito', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockFindUnique = jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(null);
        yield expect(customerRepository.addCredit(1, 500)).rejects.toThrow('Cliente no encontrado');
        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    }));
    it('debería listar todos los clientes ordenados por crédito correctamente', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const mockFindMany = jest.spyOn(prisma.customer, 'findMany').mockResolvedValue(customerList);
        const result = yield customerRepository.findAllOrderedByCredit();
        expect(mockFindMany).toHaveBeenCalledWith({
            orderBy: { availableCredit: 'desc' },
        });
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(expect.objectContaining(customerList[0]));
        expect(result[1]).toEqual(expect.objectContaining(customerList[1]));
    }));
});
