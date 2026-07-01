import { bucket } from '../../config/firebase.config';
import IUploadResult from './dto/uploadResult.dto';

export const uploadImageToStorage = async (file: Express.Multer.File): Promise<IUploadResult> => {
    
    if(file.size > 5 * 1024 * 1024){
        throw new Error('File size exceeds the 5MB limit');
    }
    
    const fileName = `images/${Date.now()}_${file.originalname}`;
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
export const deleteImageFromStorage = async (fileNameOrUrl: string): Promise<void> => {
    let fileName = fileNameOrUrl;
    if (fileNameOrUrl.includes('storage.googleapis.com')) {
        const parts = fileNameOrUrl.split(`${bucket.name}/`);
        fileName = parts[1] || fileNameOrUrl;
    }
    await bucket.file(fileName).delete();
}