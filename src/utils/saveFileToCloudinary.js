import cloudinary from 'cloudinary';
import { cloudApi } from '../constants/index.js';
import fs from 'node:fs/promises';

cloudinary.v2.config({
    secure: true,
    cloud_name: cloudApi.name,
    api_key: cloudApi.key,
    api_secret: cloudApi.secret,
});

const deleteFile = async path => {
    try {
        await fs.unlink(path);
    } catch (err) {
        console.log(err);
    }
};

const saveFileToCloudinary = async file => {
    const res = await cloudinary.v2.uploader.upload(file.path);
    deleteFile(file.path);
    console.log('saveFileToCloudinary', res);

    return res.secure_url;
};

export default saveFileToCloudinary;
