import { bucket } from '../../config/firebase.config';
import IUploadResult from './dto/uploadResult.dto';

export const uploadImageToStorage = async (file: Express.Multer.File): Promise<IUploadResult> => {
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
export const deleteImageFromStorage = async (fileName: string): Promise<void> => {
    await bucket.file(fileName).delete();
}