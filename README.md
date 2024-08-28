# Proyecto SWAPI - Reto Técnico TaxDown
Este proyecto es parte de un reto técnico para la posición de Senior Backend Developer en TaxDown. La API ha sido diseñada para demostrar la capacidad de gestionar datos de manera eficiente y escalable, alineada con las mejores prácticas y estándares exigidos por el reto.

# Descripción del Reto
El objetivo del reto es construir la API central para la gestión de clientes de una tienda de motos online, utilizando Node.js como la tecnología base. La API debe soportar operaciones CRUD sobre la entidad "Customer", agregar crédito disponible a los clientes, y listar todos los clientes ordenados por su crédito disponible. Además, la API debe desplegarse utilizando un framework serverless para demostrar habilidades en despliegue y escalabilidad.


**Arquitectura y Patrones de Diseño**:  
Los servicios se han implementado siguiendo una arquitectura hexagonal y los principios de Domain-Driven Design (DDD), lo que facilita una clara separación entre la lógica del negocio y las interacciones externas. Utiliza Command Query Responsibility Segregation (CQRS) para diferenciar entre las operaciones de lectura y escritura, lo que mejora la escalabilidad, trazabilidad y la capacidad de auditoría del sistema.
 
![Diagrama de Arquitectura](images/DiagramaArquitectura.png)

#### **UI/API [Adaptadores Primarios]** - [1] 
**Función**: Interfaz de usuario y puntos de entrada de la API.  
**Componentes**: Controladores o resolvers (src/app/controllers), Rutas (src/app/hamdler).  
**Descripción**: Gestiona las solicitudes entrantes de los usuarios o sistemas externos y las redirige a la capa de aplicación.

#### **Capa de Aplicación [Puerto Primario]** - [2]
**Función**: Orquestación de la lógica de aplicación.  
**Componentes**: Servicios (src/app/services), Configuraciones generales (src/app).  
**Descripción**: Coordina los casos de uso, procesando datos y lógica de negocio, y los envía a la capa correspondiente.

#### **Casos de Uso [Controladores de Lógica de Negocio]** - [3]
**Función**: Manejo específico de casos de uso de la lógica de negocio.  
**Componentes**: Módulos de casos de uso (src/contexts/transaction/application).  
**Descripción**: Implementa la lógica específica de los casos de uso, como procesos de transacción, validaciones y reglas de negocio.

#### **Capa de Dominio [Núcleo]** - [4]
**Función**: Núcleo de la lógica de negocio.  
**Componentes**: Entidades y lógica de dominio (src/contexts/transaction/domain).  
**Descripción**: Contiene la lógica de negocio esencial y las reglas del dominio, modelando los objetos y procesos del negocio.

#### **Puertos Secundarios [Interfaces de Dominio]** - [5]
**Función**: Interfaces para la comunicación externa.  
**Componentes**: Interfaces de dominio (src/contexts/shared/domain).  
**Descripción**: Proporciona puntos de integración y comunicación con sistemas externos o con la capa de infraestructura.

#### **Capa de Infraestructura [Adaptadores Secundarios]** - [6]
**Función**: Implementaciones técnicas y de soporte.  
**Componentes**: Implementaciones de infraestructura (src/contexts/transaction/infrastructure).  
**Descripción**: Maneja las operaciones de persistencia, conexiones a bases de datos y la interacción con servicios externos.

#### **Recursos Compartidos [Shared Kernel]** - [7]
**Función**: Código y funcionalidades comunes.  
**Componentes**: Código compartido (src/contexts/shared).  
**Descripción**: Incluye herramientas, utilidades y código que es compartido entre diferentes partes del sistema, proporcionando una base común y reduciendo la duplicidad.


#### Comenzando

#### Prerrequisitos para Configurar y Ejecutar el Proyecto Serverless
Antes de hacer cualquier solicitud a la API, asegúrate de tener las credenciales adecuadas y permisos para acceder a los servicios AWS.

Antes de clonar y ejecutar el proyecto, debes tener configurado lo siguiente en tu entorno de desarrollo:


#### Herramientas Requeridas

- **AWS CLI:** Debes tener AWS Command Line Interface instalada y configurada con tus credenciales.
- **Node.js:** Se requiere Node.js, preferiblemente la versión 18.x ya que es la que se utiliza en el runtime de AWS Lambda.
- **Serverless Framework:** Debes tener el Serverless Framework instalado globalmente en tu máquina. Puedes instalarlo con `npm install -g serverless@3.32.1`.
- **Prisma:** Asegúrate de que está instalado y configurado adecuadamente en tu entorno.
- **Base de datos:** Se esta usando Mysql Como base de datos relacional

#### Confiraciones requeridas en AWS
#### 1. Politica y rol para servicio de SSM, para poder utilizarlo en el código. ![Descargar este Manual AWS y seguir las indicaciones](images/aws_manual_icon_50x50.png) [Descargar este Manual AWS y seguir las indicaciones](https://retodev-2024.s3.amazonaws.com/AWS-CONFIGURACION.docx)

#### 2. Creación de parámetros SSM. ![Descargar este Manual AWS y seguir las indicaciones](images/aws_manual_icon_50x50.png) [Descargar este Manual AWS y seguir las indicaciones](https://documentoreto.s3.amazonaws.com/AWS_CREACION_PARAMETROS_SSM.docx)

#### 3. Creación de RDS (MySql). ![Descargar este Manual AWS y seguir las indicaciones](images/aws_manual_icon_50x50.png) [Descargar este Manual AWS y seguir las indicaciones](https://documentoreto.s3.amazonaws.com/Creacion+de+RDS+mysql.docx)


#### Configuración de AWS


1. **Instalar AWS CLI**: Asegúrate de tener el AWS Command Line Interface instalado en tu máquina.
2. **Ejecutar AWS Configure**: En tu terminal, ejecuta `aws configure` y sigue las instrucciones para ingresar tu Access Key ID, Secret Access Key, región por defecto, y el formato de salida.
- **SSM Parameters:** Asegúrate de que las siguientes variables de entorno estén configuradas en el AWS Systems Manager Parameter Store (SSM) como se indica en el manual:
  - `DATABASE_URL`: URL de conexión a tu base de datos.
  - `SWAPI_BASE_URL`: URL base para la Star Wars API (SWAPI).

#### Variables de Entorno

- Configura las variables de entorno locales necesarias para la ejecución del proyecto de forma offline. Puedes hacerlo creando un archivo `.env` en la raíz de tu proyecto con el siguiente contenido:

```plaintext
DATABASE_URL=mysql://admin:Inicios20222022$$$$$$@reto.ctpzjqve1cts.us-east-2.rds.amazonaws.com:3306/reto
```


#### Pasos para la ejecución del proyecto en producción

```bash
# Clonar el repositorio
git clone https://github.com/sistemas0011ff/challenge-TAXDOWN.git
```
#### Instalar las dependencias del proyecto


#### Ejecutar el proyecto en local

```bash
# Instalar dependencias
npm install
npm install -g serverless@3.32.1 (opcional)
npm install --save-dev typescript (opcional)
npm install mysql2 aws-sdk (opcional)
npm install --save-dev serverless-webpack@latest (opcional)
```

#### Acceder a la carpeta del proyecto

```bash
cd reto-servlees-swap
npm run start
```

#### Ejecutar el proyecto en modo offline

```bash
# ¿Qué hace npm run start?
# 1. Compila el código TypeScript a JavaScript (npm run build).
# 2. Valida que las credenciales de AWS están configuradas correctamente (npm run validate-aws).
# 3. Valida la conexión a la base de datos (npm run validate-db).
# 4. Genera el cliente de Prisma (npm run prisma:generate).
# 5. Aplica las migraciones de Prisma a la base de datos (npm run prisma:migrate).
# 6. Ejecuta el proyecto localmente utilizando Serverless Offline.

npm run start
```
Evidencia de despliegue:
![Local1](images/local_1.png)
![Local2](images/local_2.png)

#### Ejecutar el proyecto para desplegar en AWS

```bash
npx serverless deploy
```
Evidencia de despliegue:

![prod1](images/prod_1.png)



#### Endpoints de la API
![Consulta Api Externa](images/customer.png)

#### EJEMPLO : Crear UN NUEVO CLIENTE

![Nuevo Registro](images/crear1.png)
![Nuevo Registro](images/crear11.png)


## Test
 Teniendo en cuenta la arquitectura se hace fácil de realizar las pruebas, se muestra un resumen de los resultados de algunas pruebas, podemos enfocarnos en los componentes específicos y su respectiva cobertura, así como las implicaciones en términos de la calidad del código:

### Suites y Clases Testeadas

###### Manejadores de API (Handlers)
Evidencia de test, se puede geneerar con el comando npm test -- --coverage

###### Evidencia
 ![](images/ttt_1.png)
 ![](images/ttt_2.png)
 ![](images/ttt_3.png)
 ![](images/ttt_4.png)
 ![](images/ttt_5.png)

### Autor

- **Arturo Eduardo Fajardo Gutiérrez** 

