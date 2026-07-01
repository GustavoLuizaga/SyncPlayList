import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import ENV from './env.config';
import * as serviceAccount from './firebase-service-account.json';


const appFirebase = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
    storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
});

const storage = getStorage(appFirebase);
const bucket = storage.bucket();

export { storage, bucket };
export default appFirebase;
