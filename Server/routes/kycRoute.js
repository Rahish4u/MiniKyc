const express = require("express");
const router = express.Router();
const { createKYC, getAllKYC, updateStatus  } = require("../controllers/controller");

router.post("/kyc", createKYC);
router.get("/kyc", getAllKYC);
router.patch("/kyc/:id", updateStatus);

module.exports = router;