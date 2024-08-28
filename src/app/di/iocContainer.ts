import { Container, Token } from 'typedi'; 
import { PrismaClient } from '@prisma/client';

import { ICustomerRepository } from '../../contexts/customer/domain/interfaces/ICustomerRepository';
import { ICustomerRegistryService } from '../../contexts/customer/application/interfaces/ICustomerRegistryService';
import { ICustomerCreationUseCase } from '../../contexts/customer/application/interfaces/ICustomerCreationUseCase';
import { IRetrieveCustomerUseCase } from '../../contexts/customer/application/interfaces/IRetrieveCustomerUseCase';
import { IRetrieveCustomerByIdUseCase } from '../../contexts/customer/application/interfaces/IRetrieveCustomerByIdUseCase';
import { ICustomerUpdateUseCase } from '../../contexts/customer/application/interfaces/ICustomerUpdateUseCase';
import { ICustomerDeleteUseCase } from '../../contexts/customer/application/interfaces/ICustomerDeleteUseCase';
import { ICustomerCreditUseCase } from '../../contexts/customer/application/interfaces/ICustomerCreditUseCase';
import { IListCustomersByCreditUseCase } from '../../contexts/customer/application/interfaces/IListCustomersByCreditUseCase';  // Nueva importación

import { CustomerRepository } from '../../contexts/customer/infraestructure/repositories/CustomerRepository';
import { CustomerRegistryService } from '../../contexts/customer/application/services/CustomerRegistryService';
import { CustomerCreationUseCase } from '../../contexts/customer/application/usecases/CustomerCreationUseCase';
import { RetrieveCustomersUseCase } from '../../contexts/customer/application/usecases/RetrieveCustomersUseCase';
import { RetrieveCustomerByIdUseCase } from '../../contexts/customer/application/usecases/RetrieveCustomerByIdUseCase';
import { CustomerUpdateUseCase } from '../../contexts/customer/application/usecases/CustomerUpdateUseCase';
import { CustomerDeleteUseCase } from '../../contexts/customer/application/usecases/CustomerDeleteUseCase';
import { CustomerCreditUseCase } from '../../contexts/customer/application/usecases/CustomerCreditUseCase';
import { ListCustomersByCreditUseCase } from '../../contexts/customer/application/usecases/ListCustomersByCreditUseCase';  // Nueva importación

import { CreateCustomerCommandHandler } from '../../contexts/customer/application/commands/CreateCustomerCommandHandler';
import { UpdateCustomerCommandHandler } from '../../contexts/customer/application/commands/UpdateCustomerCommandHandler';
import { DeleteCustomerCommandHandler } from '../../contexts/customer/application/commands/DeleteCustomerCommandHandler';
import { AddCreditCommandHandler } from '../../contexts/customer/application/commands/AddCreditCommandHandler';
import { ListCustomersByCreditQueryHandler } from '../../contexts/customer/application/queries/ListCustomersByCreditQueryHandler';  // Nueva importación
import { GetCustomerQueryHandler } from '../../contexts/customer/application/queries/GetCustomerQueryHandler';
import { RetrieveCustomerQueryHandler } from '../../contexts/customer/application/queries/RetrieveCustomerQueryHandler';

// Tokens
export const PrismaClientToken = new Token<PrismaClient>('PrismaClient');

// Instanciación y registro de componentes 
const prismaClient = new PrismaClient();
Container.set(PrismaClientToken, prismaClient);

// Tokens para Customer
export const CustomerRepositoryToken = new Token<ICustomerRepository>('CustomerRepository');
export const CreateCustomerCommandHandlerToken = new Token<CreateCustomerCommandHandler>('CreateCustomerCommandHandler');
export const UpdateCustomerCommandHandlerToken = new Token<UpdateCustomerCommandHandler>('UpdateCustomerCommandHandler');
export const DeleteCustomerCommandHandlerToken = new Token<DeleteCustomerCommandHandler>('DeleteCustomerCommandHandler');
export const AddCreditCommandHandlerToken = new Token<AddCreditCommandHandler>('AddCreditCommandHandler');
export const ListCustomersByCreditQueryHandlerToken = new Token<ListCustomersByCreditQueryHandler>('ListCustomersByCreditQueryHandler');  // Nuevo Token
export const ICustomerRegistryServiceToken = new Token<ICustomerRegistryService>('ICustomerRegistryService');
export const ICustomerCreationUseCaseToken = new Token<ICustomerCreationUseCase>('ICustomerCreationUseCase');
export const ICustomerUpdateUseCaseToken = new Token<ICustomerUpdateUseCase>('ICustomerUpdateUseCase');
export const ICustomerDeleteUseCaseToken = new Token<ICustomerDeleteUseCase>('ICustomerDeleteUseCase');
export const ICustomerCreditUseCaseToken = new Token<ICustomerCreditUseCase>('ICustomerCreditUseCase');
export const IListCustomersByCreditUseCaseToken = new Token<IListCustomersByCreditUseCase>('IListCustomersByCreditUseCase');  // Nuevo Token
export const RetrieveCustomerUseCaseToken = new Token<IRetrieveCustomerUseCase>('RetrieveCustomerUseCase');
export const RetrieveCustomerByIdUseCaseToken = new Token<IRetrieveCustomerByIdUseCase>('RetrieveCustomerByIdUseCase');
export const GetCustomerQueryHandlerToken = new Token<GetCustomerQueryHandler>('GetCustomerQueryHandler');
export const RetrieveCustomerQueryHandlerToken = new Token<RetrieveCustomerQueryHandler>('RetrieveCustomerQueryHandler');

// Instanciación y registro de componentes para Customer

Container.set(CustomerRepositoryToken, new CustomerRepository(prismaClient));
Container.set(CreateCustomerCommandHandlerToken, new CreateCustomerCommandHandler(Container.get(CustomerRepositoryToken)));
Container.set(UpdateCustomerCommandHandlerToken, new UpdateCustomerCommandHandler(Container.get(CustomerRepositoryToken)));
Container.set(DeleteCustomerCommandHandlerToken, new DeleteCustomerCommandHandler(Container.get(CustomerRepositoryToken)));
Container.set(AddCreditCommandHandlerToken, new AddCreditCommandHandler(Container.get(CustomerRepositoryToken)));
Container.set(ListCustomersByCreditQueryHandlerToken, new ListCustomersByCreditQueryHandler(Container.get(CustomerRepositoryToken)));  // Nueva instanciación

Container.set(ICustomerCreationUseCaseToken, new CustomerCreationUseCase(Container.get(CreateCustomerCommandHandlerToken)));
Container.set(ICustomerUpdateUseCaseToken, new CustomerUpdateUseCase(Container.get(UpdateCustomerCommandHandlerToken)));
Container.set(ICustomerDeleteUseCaseToken, new CustomerDeleteUseCase(Container.get(DeleteCustomerCommandHandlerToken)));
Container.set(ICustomerCreditUseCaseToken, new CustomerCreditUseCase(Container.get(AddCreditCommandHandlerToken)));
Container.set(IListCustomersByCreditUseCaseToken, new ListCustomersByCreditUseCase(Container.get(ListCustomersByCreditQueryHandlerToken)));  // Nueva instanciación

Container.set(RetrieveCustomerQueryHandlerToken, new RetrieveCustomerQueryHandler(Container.get(CustomerRepositoryToken)));
Container.set(RetrieveCustomerUseCaseToken, new RetrieveCustomersUseCase(Container.get(RetrieveCustomerQueryHandlerToken)));
Container.set(RetrieveCustomerByIdUseCaseToken, new RetrieveCustomerByIdUseCase(Container.get(CustomerRepositoryToken)));

Container.set(ICustomerRegistryServiceToken, new CustomerRegistryService(
    Container.get(ICustomerCreationUseCaseToken),
    Container.get(RetrieveCustomerUseCaseToken),
    Container.get(RetrieveCustomerByIdUseCaseToken),
    Container.get(ICustomerUpdateUseCaseToken),
    Container.get(ICustomerDeleteUseCaseToken),
    Container.get(ICustomerCreditUseCaseToken),
    Container.get(IListCustomersByCreditUseCaseToken)  // Se añade la inyección del caso de uso ListCustomersByCreditUseCase
));

export default Container;
