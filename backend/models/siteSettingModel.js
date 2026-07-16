import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true }
}, { timestamps: true });

const siteSettingModel = mongoose.models.siteSetting || mongoose.model("siteSetting", siteSettingSchema);

export default siteSettingModel;
