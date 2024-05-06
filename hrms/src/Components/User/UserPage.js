import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate} from "react-router-dom";

const UserPage = () => {
  const [Leaves, setLeaves] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [totalLeaves, SetTotalLeaves] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [status, setStatus] = useState("pending");
  const [employeeId, setEmployeeId] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7144/api/LeaveManagement/${userId}`
      );
      setLeaves(response.data);
    } catch (error) {
      console.error("Failed to fetch Leaves:", error);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      // Fetch leave types from the database
      const response = await axios.get(
        "https://localhost:7144/api/LeaveManagement/LeaveTypes"
      );
      // Update the state with the fetched leave types
      setLeaveTypes(response.data);
    } catch (error) {
      console.error("Failed to fetch leave types:", error);
    }
  };

  const handleApplyLeave = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmitLeave = async () => {
    try {
      console.log(employeeName);
      console.log(leaveType);
      console.log(totalLeaves);
      console.log(status);

      const response = await axios.post(
        "https://localhost:7144/api/LeaveManagement/AddLeave",
        {
          EmployeeName: employeeName,
          LeaveTypeId: leaveType,
          TotalLeaves: totalLeaves,
          Status: status,
          UserId: userId,
        }
      );

      console.log("Leave application submitted successfully:", response.data);

      setShowPopup(false);
    } catch (error) {
      console.error("Failed to submit leave application:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [handleSubmitLeave]);

  const handleLogout = () => {

    localStorage.setItem("isLoggedIn", "false");
    
    Promise.resolve().then(() => {
      navigate("/Login");
    });
  };

  return (
    <div className="container">
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex items-center ml-auto">
              <Link
                onClick={handleLogout}
                className="text-white hover:text-gray-100 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none bg-red-500 hover:bg-red-600"
              >
                Log out
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex justify-between items-center pt-4 ">
        <h2 className="text-primary text-2xl font-bold mx-10">Leaves</h2>
        <button
          onClick={handleApplyLeave}
          id="applyLeaveBtn"
          className="btn btn-primary bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-10"
        >
          Apply Leave
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {" "}
          {/* Increase z-index */}
          <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>{" "}
          {/* Background overlay */}
          <div className="bg-white rounded-lg shadow-xl p-8 w-96 h-80 relative z-50">
            {" "}
            {/* Popup container */}
            <h2 className="text-lg font-bold mb-4">Apply Leave</h2>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="employeeName"
              >
                Employee Name
              </label>
              <input
                type="text"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="form-input w-full"
                placeholder="Enter Employee Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="leaveType"
              >
                Leave Type
              </label>
              <select
                id="leaveType"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="form-select w-full"
              >
                <option value="">Select leave type</option>
                {leaveTypes.map((leaveType) => (
                  <option
                    key={leaveType.leaveTypeId}
                    value={leaveType.leaveTypeId}
                  >
                    {leaveType.leaveType}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="totalLeaves"
              >
                Total Leaves
              </label>
              <input
                type="text"
                id="totalLeaves"
                value={totalLeaves}
                onChange={(e) => SetTotalLeaves(e.target.value)}
                className="form-input w-full"
                placeholder="Enter Total Leaves"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmitLeave}
                className="btn btn-primary mr-2"
              >
                Submit
              </button>
              <button onClick={handleClosePopup} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            {/* <th className="px-4 py-2">Employee Name</th> */}
            <th className="px-4 py-2">Leave Type</th>
            <th className="px-4 py-2">Total Leaves</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {Leaves.map((leave) => (
            <tr key={leave.id}>
              {/* <td className="border px-4 py-2 text-center">{leave.employeeName}</td> */}
              <td className="border px-4 py-2 text-center">
                {leave.leaveTypeId === 1
                  ? "Sick Leave"
                  : leave.leaveTypeId === 2
                  ? "Casual Leave"
                  : ""}
              </td>
              <td className="border px-4 py-2 text-center">
                {leave.totalLeaves}
              </td>
              <td className="border px-4 py-2 text-center">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
