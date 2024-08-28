import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import Container, { ICustomerRegistryServiceToken } from '../../di/iocContainer';
import { ICustomerRegistryService } from '../../../contexts/customer/application/interfaces/ICustomerRegistryService';

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ error: 'No se proporcionaron datos.' }) 
            };
        }

        const data = JSON.parse(event.body);
        const { customerId, creditAmount } = data;

        if (typeof customerId !== 'number' || typeof creditAmount !== 'number') {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'ID de cliente y monto de crédito deben ser números.' })
            };
        }

        const customerRegistryService = Container.get<ICustomerRegistryService>(ICustomerRegistryServiceToken);
        const updatedCustomer = await customerRegistryService.addCredit(customerId, creditAmount);

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "Crédito añadido con éxito",
                customer: updatedCustomer 
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al añadir el crédito.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};