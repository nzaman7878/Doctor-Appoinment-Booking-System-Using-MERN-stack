import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const doc = await doctorModel.findById(docId);

    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    doc.available = !doc.available;
    await doc.save();

    res.json({
      success: true,
      message: "Availability Updated",
      available: doc.available,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find().select("-password -email");
    
    res.json({
      success: true,
      doctors
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
}


export { changeAvailability, doctorList };
