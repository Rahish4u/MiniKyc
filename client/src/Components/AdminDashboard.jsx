import { useEffect, useState } from "react";
import axios from "axios";

const maskPan = (pan) => (pan ? pan.replace(/^.{0,4}/, "XXXX") : "N/A");
const maskAadhaar = (aadhaar) =>
  aadhaar ? aadhaar.replace(/^(\d{4})-(\d{4})/, "XXXX-XXXX") : "N/A";

const AdminDashboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/kyc")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err));
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/kyc/${id}`, {
        status: newStatus,
      });

      // Update local state
      setEntries((prev) =>
        prev.map((entry) =>
          entry._id === id ? { ...entry, status: newStatus } : entry
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded mt-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Admin Dashboard
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">PAN</th>
              <th className="p-2 border">Aadhaar</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id} className="text-center">
                <td className="p-2 border">{entry.name}</td>
                <td className="p-2 border">{maskPan(entry.pan)}</td>
                <td className="p-2 border">{maskAadhaar(entry.aadhaar)}</td>
                <td className="p-2 border">{entry.mobile}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(
                      entry.status
                    )}`}
                  >
                    {entry.status}
                  </span>
                  <div className="flex justify-center gap-1 mt-1">
                    <button
                      onClick={() => updateStatus(entry._id, "Approved")}
                      className="text-green-600 hover:underline text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(entry._id, "Rejected")}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
