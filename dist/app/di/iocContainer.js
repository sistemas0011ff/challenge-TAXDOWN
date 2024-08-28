"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveCustomerQueryHandlerToken = exports.GetCustomerQueryHandlerToken = exports.RetrieveCustomerByIdUseCaseToken = exports.RetrieveCustomerUseCaseToken = exports.IListCustomersByCreditUseCaseToken = exports.ICustomerCreditUseCaseToken = exports.ICustomerDeleteUseCaseToken = exports.ICustomerUpdateUseCaseToken = exports.ICustomerCreationUseCaseToken = exports.ICustomerRegistryServiceToken = exports.ListCustomersByCreditQueryHandlerToken = exports.AddCreditCommandHandlerToken = exports.DeleteCustomerCommandHandlerToken = exports.UpdateCustomerCommandHandlerToken = exports.CreateCustomerCommandHandlerToken = exports.CustomerRepositoryToken = exports.PrismaClientToken = void 0;
const typedi_1 = require("typedi");
const client_1 = require("@prisma/client");
const CustomerRepository_1 = require("../../contexts/customer/infraestructure/repositories/CustomerRepository");
const CustomerRegistryService_1 = require("../../contexts/customer/application/services/CustomerRegistryService");
const CustomerCreationUseCase_1 = require("../../contexts/customer/application/usecases/CustomerCreationUseCase");
const RetrieveCustomersUseCase_1 = require("../../contexts/customer/application/usecases/RetrieveCustomersUseCase");
const RetrieveCustomerByIdUseCase_1 = require("../../contexts/customer/application/usecases/RetrieveCustomerByIdUseCase");
const CustomerUpdateUseCase_1 = require("../../contexts/customer/application/usecases/CustomerUpdateUseCase");
const CustomerDeleteUseCase_1 = require("../../contexts/customer/application/usecases/CustomerDeleteUseCase");
const CustomerCreditUseCase_1 = require("../../contexts/customer/application/usecases/CustomerCreditUseCase");
const ListCustomersByCreditUseCase_1 = require("../../contexts/customer/application/usecases/ListCustomersByCreditUseCase"); // Nueva importación
const CreateCustomerCommandHandler_1 = require("../../contexts/customer/application/commands/CreateCustomerCommandHandler");
const UpdateCustomerCommandHandler_1 = require("../../contexts/customer/application/commands/UpdateCustomerCommandHandler");
const DeleteCustomerCommandHandler_1 = require("../../contexts/customer/application/commands/DeleteCustomerCommandHandler");
const AddCreditCommandHandler_1 = require("../../contexts/customer/application/commands/AddCreditCommandHandler");
const ListCustomersByCreditQueryHandler_1 = require("../../contexts/customer/application/queries/ListCustomersByCreditQueryHandler"); // Nueva importación
const RetrieveCustomerQueryHandler_1 = require("../../contexts/customer/application/queries/RetrieveCustomerQueryHandler");
// Tokens
exports.PrismaClientToken = new typedi_1.Token('PrismaClient');
// Instanciación y registro de componentes 
const prismaClient = new client_1.PrismaClient();
typedi_1.Container.set(exports.PrismaClientToken, prismaClient);
// Tokens para Customer
exports.CustomerRepositoryToken = new typedi_1.Token('CustomerRepository');
exports.CreateCustomerCommandHandlerToken = new typedi_1.Token('CreateCustomerCommandHandler');
exports.UpdateCustomerCommandHandlerToken = new typedi_1.Token('UpdateCustomerCommandHandler');
exports.DeleteCustomerCommandHandlerToken = new typedi_1.Token('DeleteCustomerCommandHandler');
exports.AddCreditCommandHandlerToken = new typedi_1.Token('AddCreditCommandHandler');
exports.ListCustomersByCreditQueryHandlerToken = new typedi_1.Token('ListCustomersByCreditQueryHandler'); // Nuevo Token
exports.ICustomerRegistryServiceToken = new typedi_1.Token('ICustomerRegistryService');
exports.ICustomerCreationUseCaseToken = new typedi_1.Token('ICustomerCreationUseCase');
exports.ICustomerUpdateUseCaseToken = new typedi_1.Token('ICustomerUpdateUseCase');
exports.ICustomerDeleteUseCaseToken = new typedi_1.Token('ICustomerDeleteUseCase');
exports.ICustomerCreditUseCaseToken = new typedi_1.Token('ICustomerCreditUseCase');
exports.IListCustomersByCreditUseCaseToken = new typedi_1.Token('IListCustomersByCreditUseCase'); // Nuevo Token
exports.RetrieveCustomerUseCaseToken = new typedi_1.Token('RetrieveCustomerUseCase');
exports.RetrieveCustomerByIdUseCaseToken = new typedi_1.Token('RetrieveCustomerByIdUseCase');
exports.GetCustomerQueryHandlerToken = new typedi_1.Token('GetCustomerQueryHandler');
exports.RetrieveCustomerQueryHandlerToken = new typedi_1.Token('RetrieveCustomerQueryHandler');
// Instanciación y registro de componentes para Customer
typedi_1.Container.set(exports.CustomerRepositoryToken, new CustomerRepository_1.CustomerRepository(prismaClient));
typedi_1.Container.set(exports.CreateCustomerCommandHandlerToken, new CreateCustomerCommandHandler_1.CreateCustomerCommandHandler(typedi_1.Container.get(exports.CustomerRepositoryToken)));
typedi_1.Container.set(exports.UpdateCustomerCommandHandlerToken, new UpdateCustomerCommandHandler_1.UpdateCustomerCommandHandler(typedi_1.Container.get(exports.CustomerRepositoryToken)));
typedi_1.Container.set(exports.DeleteCustomerCommandHandlerToken, new DeleteCustomerCommandHandler_1.DeleteCustomerCommandHandler(typedi_1.Container.get(exports.CustomerRepositoryToken)));
typedi_1.Container.set(exports.AddCreditCommandHandlerToken, new AddCreditCommandHandler_1.AddCreditCommandHandler(typedi_1.Container.get(exports.CustomerRepositoryToken)));
typedi_1.Container.set(exports.ListCustomersByCreditQueryHandlerToken, new ListCustomersByCreditQueryHandler_1.ListCustomersByCreditQueryHandler(typedi_1.Container.get(exports.CustomerRepositoryToken))); // Nueva instanciación
typedi_1.Container.set(exports.ICustomerCreationUseCaseToken, new CustomerCreationUseCase_1.CustomerCreationUseCase(typedi_1.Container.get(exports.CreateCustomerCommandHandlerToken)));
typedi_1.Container.set(exports.ICustomerUpdateUseCaseToken, new CustomerUpdateUseCase_1.CustomerUpdateUseCase(typedi_1.Container.get(exports.UpdateCustomerCommandHandlerToken)));
typedi_1.Container.set(exports.ICustomerDeleteUseCaseToken, new CustomerDeleteUseCase_1.CustomerDeleteUseCase(typedi_1.Container.get(exports.DeleteCustomerCommandHandlerToken)));
typedi_1.Container.set(exports.ICustomerCreditUseCaseToken, new CustomerCreditUseCase_1.CustomerCreditUseCase(typedi_1.Container.get(exports.AddCreditCommandHandlerToken)));
typedi_1.Container.set(exports.IListCustomersByCreditUseCaseToken, new ListCustomersByCreditUseCase_1.ListCustomersByCreditUseCase(typedi_1.Container.get(exports.ListCustomersByCreditQueryHandlerToken))); // Nueva instanciación
typedi_1.Container.set(exports.RetrieveCustomerQueryHandlerToken, new RetrieveCustomerQueryHandler_1.RetrieveCustomerQueryHandler(typedi_1.Container.get(exports.CustomerRepositoryToken)));
typedi_1.Container.set(exports.RetrieveCustomerUseCaseToken, new RetrieveCustomersUseCase_1.RetrieveCustomersUseCase(typedi_1.Container.get(exports.RetrieveCustomerQueryHandlerToken)));
typedi_1.Container.set(exports.RetrieveCustomerByIdUseCaseToken, new RetrieveCustomerByIdUseCase_1.RetrieveCustomerByIdUseCase(typedi_1.Container.get(exports.CustomerRepositoryToken)));
typedi_1.Container.set(exports.ICustomerRegistryServiceToken, new CustomerRegistryService_1.CustomerRegistryService(typedi_1.Container.get(exports.ICustomerCreationUseCaseToken), typedi_1.Container.get(exports.RetrieveCustomerUseCaseToken), typedi_1.Container.get(exports.RetrieveCustomerByIdUseCaseToken), typedi_1.Container.get(exports.ICustomerUpdateUseCaseToken), typedi_1.Container.get(exports.ICustomerDeleteUseCaseToken), typedi_1.Container.get(exports.ICustomerCreditUseCaseToken), typedi_1.Container.get(exports.IListCustomersByCreditUseCaseToken) // Se añade la inyección del caso de uso ListCustomersByCreditUseCase
));
exports.default = typedi_1.Container;
