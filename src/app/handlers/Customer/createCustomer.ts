import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { ICustomerRegistryService } from '../../../contexts/customer/application/interfaces/ICustomerRegistryService';
import { CustomerData } from '../../../contexts/customer/application/dtos/CustomerData';
import Container, { ICustomerRegistryServiceToken } from '../../di/iocContainer';

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ error: 'No se proporcionaron datos.' }) 
            };
        }

        const data = JSON.parse(event.body);
        const customerData = new CustomerData(data);
        const customerRegistryService = Container.get<ICustomerRegistryService>(ICustomerRegistryServiceToken);
        const customer = await customerRegistryService.createCustomer(customerData);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "Cliente creado con éxito",
                customer: customer 
            }),
        };
    } catch (error) { 
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al crear el cliente.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
