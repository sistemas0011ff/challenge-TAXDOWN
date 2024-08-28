import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { ICustomerRegistryService } from '../../../contexts/customer/application/interfaces/ICustomerRegistryService';
import Container, { ICustomerRegistryServiceToken } from '../../di/iocContainer';

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
    try {
        const customerId = event.pathParameters?.id;

        if (!customerId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'ID de cliente no proporcionado.' }),
            };
        }

        const customerRegistryService = Container.get<ICustomerRegistryService>(ICustomerRegistryServiceToken);
        await customerRegistryService.deleteCustomer(Number(customerId));

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "Cliente eliminado con éxito"
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al eliminar el cliente.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};
