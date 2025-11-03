import { bucket } from '../../config/firebase.config';
import IUploadResult from './dto/uploadResult.dto';

export const uploadFileToStorage = async (file: Express.Multer.File): Promise<IUploadResult> => {
    const fileName = `music/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
        metadata: {
            contentType: file.mimetype,
        },
        public: true, 
    });

   
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return {
        fileName,
        url: publicUrl,
    };
};


export const deleteFileFromStorage = async (fileName: string): Promise<void> => {
    await bucket.file(fileName).delete();
};


export const getSignedUrlFromStorage = async (fileName: string): Promise<string> => {
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000,
    });

    return url;
};