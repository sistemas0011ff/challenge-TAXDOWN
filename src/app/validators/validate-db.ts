import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function validateDatabaseConnection() {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL as string);
    console.log('✅ Conexión a la base de datos exitosa');
    await connection.end();
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ Error: No se pudo conectar a la base de datos');
      console.error('Mensaje de error:', err.message);
    } else {
      console.error('❌ Error desconocido:', err);
    }
    process.exit(1);  // Salir con código de error
  }
}

validateDatabaseConnection();
