import dotenv from 'dotenv';

dotenv.config();

const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // Database
    DATABASE_URL: process.env.DATABASE_URL || '',
    POSTGRES_USER: process.env.POSTGRES_USER || '',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
    POSTGRES_DB: process.env.POSTGRES_DB || '',
    PGDATA: process.env.PGDATA || '',
    SALTS: process.env.SALTS || '10',
    
    // Firebase
    FIREBASE_SERVICE_ACCOUNT_PATH: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './src/config/firebase-service-account.json',
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || 'prueba-35ced.appspot.com',
};

export default ENV;