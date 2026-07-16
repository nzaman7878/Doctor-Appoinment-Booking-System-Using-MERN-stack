import siteSettingModel from "../models/siteSettingModel.js";
import { v2 as cloudinary } from 'cloudinary';

// API for public to fetch settings
export const getSettings = async (req, res) => {
    try {
        const settings = await siteSettingModel.find({});
        // Convert array of {key, value} into a key-value object
        const settingsObject = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        
        res.json({ success: true, settings: settingsObject });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for admin to upload/update an image setting
export const uploadSettingImage = async (req, res) => {
    try {
        const { key } = req.body;
        const imageFile = req.file;

        if (!key || !imageFile) {
            return res.json({ success: false, message: "Key and image are required" });
        }

        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Find and update, or create if it doesn't exist (upsert)
        await siteSettingModel.findOneAndUpdate(
            { key }, 
            { value: imageUrl },
            { upsert: true, new: true }
        );

        res.json({ success: true, message: "Setting updated successfully", imageUrl });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
