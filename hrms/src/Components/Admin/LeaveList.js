import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LeaveList = () => {
  const [Leaves, setLeaves] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [totalLeaves, SetTotalLeaves] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [status, setStatus] = useState("pending");
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();


  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7144/api/LeaveManagement"
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
        }
      );

      console.log("Leave application submitted successfully:", response.data);

      setShowPopup(false);
    } catch (error) {
      console.error("Failed to submit leave application:", error);
    }
  };

  const handleApprove = async (id, leaveViewModel) => {
    try {
      console.log(leaveViewModel.EmployeeName);
      console.log(leaveViewModel.LeaveTypeId);
      console.log(leaveViewModel.TotalLeaves);
      console.log(leaveViewModel.Status);
      console.log(id);

      const response = await axios.put(
        `https://localhost:7144/api/LeaveManagement/${id}`,
        {
          EmployeeName: leaveViewModel.EmployeeName,
          LeaveTypeId: leaveViewModel.LeaveTypeId,
          TotalLeaves: leaveViewModel.TotalLeaves,
          Status: "Approved",
          Id: id,
        }
      );

      console.log("Leave application approved successfully:", response.data);
    } catch (error) {
      console.error("Failed to approved leave application:", error);
    }
  };

  const handleReject = async (id, leaveViewModel) => {
    try {
      const response = await axios.put(
        `https://localhost:7144/api/LeaveManagement/${id}`,
        {
          EmployeeName: leaveViewModel.EmployeeName,
          LeaveTypeId: leaveViewModel.LeaveTypeId,
          TotalLeaves: leaveViewModel.TotalLeaves,
          Status: "Rejected",
          Id: id,
        }
      );

      console.log("Leave application rejected successfully:", response.data);

      setShowPopup(false);
    } catch (error) {
      console.error("Failed to reject leave application:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [handleSubmitLeave, handleApprove, handleReject]);



  
  const handleLogout = () => {

    localStorage.setItem("isLoggedIn", "false");
    console.log(localStorage.getItem("isLoggedIn"));
    
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
      </div>

      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Employee Name</th>
            <th className="px-4 py-2">Leave Type</th>
            <th className="px-4 py-2">Total Leaves</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {Leaves.map((leave) => (
            <tr key={leave.id}>
              <td className="border px-4 py-2 text-center">
                {leave.employeeName}
              </td>
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
              {leave.status !== "Approved" && leave.status !== "Rejected" && (
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() =>
                      handleApprove(leave.id, {
                        EmployeeName: leave.employeeName,
                        LeaveTypeId: leave.leaveTypeId,
                        Status: leave.status,
                        TotalLeaves: leave.totalLeaves,
                      })
                    }
                    className="editBtn btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleReject(leave.id, {
                        EmployeeName: leave.employeeName,
                        LeaveTypeId: leave.leaveTypeId,
                        Status: leave.status,
                        TotalLeaves: leave.totalLeaves,
                      })
                    }
                    className="deleteBtn btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
