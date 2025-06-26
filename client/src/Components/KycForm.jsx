import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const KycForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    pan: "",
    dob: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aadhaar: auto-format to 4-4-4 digits
    if (name === "aadhaar") {
      const raw = value.replace(/\D/g, "").slice(0, 12);
      const formatted = raw.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1-$2-$3");
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    }
    // Mobile: accept only numbers
    else if (name === "mobile") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digits }));
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/;

    if (!panRegex.test(formData.pan)) {
      toast.error("Invalid PAN format (e.g., ABCDE1234F)");
      return;
    }

    if (!aadhaarRegex.test(formData.aadhaar)) {
      toast.error("Invalid Aadhaar format (1234-5678-9123)");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/kyc", formData);
      toast.success("✅ KYC Submitted Successfully!");
      setFormData({
        name: "",
        aadhaar: "",
        pan: "",
        dob: "",
        mobile: "",
        address: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Submission Failed!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">KYC Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded outline-blue-500"
          required
        />
        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar (1234-5678-9123)"
          value={formData.aadhaar}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded outline-blue-500"
          required
        />
        <input
          type="text"
          name="pan"
          placeholder="PAN (ABCDE1234F)"
          value={formData.pan}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded uppercase outline-blue-500"
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded outline-blue-500"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile (10 digits)"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded outline-blue-500"
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded outline-blue-500"
          rows={3}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KycForm;
