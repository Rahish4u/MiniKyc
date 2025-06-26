const KYC = require("../models/kyc");

exports.createKYC = async (req, res) => {
  try {
    const kyc = await KYC.create(req.body);
    res.status(201).json(kyc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllKYC = async (req, res) => {
  try {
    const data = await KYC.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await KYC.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};