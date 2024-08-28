import { PrismaClient } from '@prisma/client';
import { CustomerData } from '../../application/dtos/CustomerData';
import { ICustomerRepository } from '../../domain/interfaces/ICustomerRepository';

export class CustomerRepository implements ICustomerRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async save(customerData: CustomerData): Promise<string> {
        const newCustomer = await this.prisma.customer.create({
            data: {
                name: customerData.name,
                email: customerData.email,
                phoneNumber: customerData.phoneNumber,
                address: customerData.address,
                availableCredit: customerData.availableCredit,
                created: customerData.created,   
                edited: customerData.edited  
            },
        });

        return newCustomer.id.toString();
    }

    async findById(id: number): Promise<CustomerData | null> {
        const customer = await this.prisma.customer.findUnique({
            where: { id: id },
        });

        if (customer) {
            return new CustomerData({
                id: customer.id,
                name: customer.name,
                email: customer.email,
                phoneNumber: customer.phoneNumber,
                address: customer.address,
                availableCredit: customer.availableCredit,
                created: customer.created,   
                edited: customer.edited  
            });
        }

        return null;
    }

    async findAll(): Promise<CustomerData[]> {
        const customerList = await this.prisma.customer.findMany();

        return customerList.map((c) => new CustomerData({
            id: c.id,
            name: c.name,
            email: c.email,
            phoneNumber: c.phoneNumber,
            address: c.address,
            availableCredit: c.availableCredit,
            created: c.created,  
            edited: c.edited  
        }));
    }

    async update(customerData: CustomerData): Promise<CustomerData> {
        const updatedCustomer = await this.prisma.customer.update({
            where: { id: customerData.id },
            data: {
                name: customerData.name,
                email: customerData.email,
                phoneNumber: customerData.phoneNumber,
                address: customerData.address,
                availableCredit: customerData.availableCredit,
                edited: new Date(),  
            },
        });

        return new CustomerData({
            id: updatedCustomer.id,
            name: updatedCustomer.name,
            email: updatedCustomer.email,
            phoneNumber: updatedCustomer.phoneNumber,
            address: updatedCustomer.address,
            availableCredit: updatedCustomer.availableCredit,
            created: updatedCustomer.created,
            edited: updatedCustomer.edited,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.customer.delete({
            where: { id: id },
        });
    }
 
    async addCredit(customerId: number, creditAmount: number): Promise<CustomerData> {
        const customer = await this.prisma.customer.findUnique({ where: { id: customerId } });

        if (!customer) {
            throw new Error('Cliente no encontrado');
        }

        const updatedCustomer = await this.prisma.customer.update({
            where: { id: customerId },
            data: {
                availableCredit: customer.availableCredit + creditAmount,
                edited: new Date(),   
            },
        });

        return new CustomerData({
            id: updatedCustomer.id,
            name: updatedCustomer.name,
            email: updatedCustomer.email,
            phoneNumber: updatedCustomer.phoneNumber,
            address: updatedCustomer.address,
            availableCredit: updatedCustomer.availableCredit,
            created: updatedCustomer.created,
            edited: updatedCustomer.edited,
        });
    }

    async findAllOrderedByCredit(): Promise<CustomerData[]> {
        const customerList = await this.prisma.customer.findMany({
            orderBy: {
                availableCredit: 'desc',
            },
        });

        return customerList.map((c) => new CustomerData({
            id: c.id,
            name: c.name,
            email: c.email,
            phoneNumber: c.phoneNumber,
            address: c.address,
            availableCredit: c.availableCredit,
            created: c.created,
            edited: c.edited,
        }));
    }
}
