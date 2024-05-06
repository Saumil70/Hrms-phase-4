import React, { useState, useEffect } from "react";
import axios from "axios";
import { resolvePath, useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";

function UserTimeSheet() {
  const [timeSheet, setTimeSheet] = useState([]);
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [timeSheetId, setTimeSheetId] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [initialStatus, setInitialStatus] = useState("pending");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [timeSheetByDate, setTimeSheetByDate] = useState([
    {
      projectId: "",
      totalTime: "",
      status: "",
      task: "",
      timeSheetId: "",
      date: "",
    },
  ]);
  const [timeSheetCreated, setTimeSheetCreated] = useState("");

  const findLatestDate = (timeSheets) => {
    if (timeSheets.length === 0) {
      return null;
    }

    const latestDate = timeSheets
      .map((ts) => new Date(ts.date))
      .reduce((a, b) => (a > b ? a : b), new Date(0));

    return latestDate;
  };

  const latestDate = findLatestDate(timeSheet);
  const fullDate = latestDate ? addDays(latestDate, 1) : new Date();
  const nextDate = format(fullDate, "yyyy-MM-dd");
  const latestDateFormatted = latestDate
    ? format(latestDate, "yyyy-MM-dd")
    : "latestDate is not formated";

  const fetchTimeSheets = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7144/api/TimeSheet/GetTimeSheet?userId=${userId}`
      );

      setTimeSheet(response.data);
    } catch (error) {
      console.error("Failed to fetch TimeSheet:", error);
    }
  };

  const setRowData = (index, field, value) => {
    setTimeSheetByDate((prevState) => {
      const newState = [...prevState];
      newState[index][field] = value;
      return newState;
    });
  };

  const handleCreateTimeSheet = async (projectId, task, totalTime) => {
    try {
      console.log(projectId);
      console.log(totalTime);
      console.log(initialStatus);
      console.log(userId);
      console.log(task);

      const response = await axios.post(
        "https://localhost:7144/api/TimeSheet/AddTimeSheet",
        {
          ProjectId: projectId,
          Task: task,
          Date: nextDate,
          TotalTime: totalTime,
          Status: initialStatus,
          UserId: userId,
        }
      );

      console.log("TimeSheet submitted successfully:", response.data);
      setTimeSheetCreated(response.data);
    } catch (error) {
      console.error("Failed to submit TimeSheet :", error);
    }
  };

  const Save = async () => {
    try {
      console.log(timeSheetByDate);
      for (let ts of timeSheetByDate) {
        console.log("ProjectId:", ts.projectId);
        console.log("totaltime:", ts.totalTime);
        console.log("Status:", ts.status);
        console.log("UserId:", userId);
        console.log("task:", ts.task);
        console.log("timesheetId:", ts.timeSheetId);
        console.log("Date:", ts.date);
        const response = await axios.put(
          `https://localhost:7144/api/TimeSheet/UpdateTimeSheet/?id=${ts.timeSheetId}`,
          {
            TimeSheetId: ts.timeSheetId,
            ProjectId: ts.projectId,
            Task: ts.task,
            Date: ts.date,
            TotalTime: ts.totalTime,
            Status: ts.status,
            UserId: userId,
          }
        );
        console.log("TimeSheet updated successfully:", response.data);
        setTimeSheetCreated(response.data);
      }
    } catch (error) {
      console.error("Failed to update TimeSheet :", error);
    }
  };

  const AddRow = async (projectId, task, totalTime) => {
    try {
      console.log(projectId);
      console.log(totalTime);
      console.log(initialStatus);
      console.log(userId);
      console.log(task);
      console.log(date);

      const response = await axios.post(
        "https://localhost:7144/api/TimeSheet/AddTimeSheet",
        {
          ProjectId: projectId,
          Task: task,
          Date: date,
          TotalTime: totalTime,
          Status: initialStatus,
          UserId: userId,
        }
      );

      console.log("Add new Record successfully:", response.data);
      setTimeSheetCreated(response.data);
    } catch (error) {
      console.error("Failed to Add new record :", error);
    }
  };

  const GetTimeSheetByDate = async (date) => {
    try {
      const response = await axios.get(
        `https://localhost:7144/api/TimeSheet/GetTimeSheetByDate?date=${date}`
      );

      setTimeSheetByDate(response.data);
      console.log(timeSheetByDate);

      console.log("TimeSheet get successfully:", response.data);
    } catch (error) {
      console.error("Failed to get TimeSheet :", error);
    }
  };

  useEffect(() => {
    if (timeSheetByDate.length > 0) {
      // Only proceed if there's at least one item
      const firstTimeSheet = timeSheetByDate[0];
      setTask(firstTimeSheet.task ?? ""); // Use default if undefined
      setTotalTime(firstTimeSheet.totalTime ?? "00:00:00");
      setProjectId(firstTimeSheet.projectId ?? "");
      setStatus(firstTimeSheet.status ?? "pending");
      setTimeSheetId(firstTimeSheet.timeSheetId);
      setDate(firstTimeSheet.date);
    }
  }, [timeSheetByDate]);

  useEffect(() => {
    fetchTimeSheets().then(() => {
      console.log(latestDateFormatted);
      if (latestDateFormatted) {
        GetTimeSheetByDate(latestDateFormatted);
      }
    });
  }, [timeSheetCreated]);

  useEffect(() => {
    GetTimeSheetByDate(date);
  }, [date]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");

    Promise.resolve().then(() => {
      navigate("/Login");
    });
  };

  return (
    <div className="container">
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-red-100 border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex items-center ml-auto">
              <Link
                onClick={handleLogout}
                className="text-white hover:text-gray-100 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none bg-red-500 hover:bg-red-600"
              >
                Log out
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex justify-between items-center pt-4">
        <h2 className="text-primary text-2xl font-bold mx-10">Time Sheet</h2>
        <div className="flex">
          <button
            onClick={() => {
              Save();
            }}
            className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
          >
            Save
          </button>

          <button
            onClick={() => {
              AddRow(null, null, "00:00:00");
            }}
            id="applyLeaveBtn"
            className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4"
          >
            Add Row
          </button>

          <button
            onClick={() => {
              handleCreateTimeSheet(null, null, "00:00:00");
            }}
            id="applyLeaveBtn"
            className="btn btn-primary bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-4"
          >
            Create TimeSheet
          </button>
        </div>
      </div>

      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Project Name</th>
            <th className="px-4 py-2">Task</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {timeSheetByDate.map((timeSheet, index) => (
            <tr key={timeSheet.timeSheetId}>
              <td className="border px-4 py-2 text-center">
                <select
                  value={timeSheet.projectId}
                  className="text-center border rounded"
                  onChange={(e) =>
                    setRowData(index, "projectId", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Project
                  </option>
                  <option value={1}>Hrms</option>
                  <option value={2}>MovieBooking</option>
                </select>
              </td>
              <td className="border px-4 py-2 text-center">
                <input
                  type="text"
                  value={timeSheet.task}
                  className="text-center"
                  onChange={(e) => setRowData(index, "task", e.target.value)}
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <input
                  type="text"
                  value={timeSheet.totalTime}
                  className="text-center"
                  onChange={(e) =>
                    setRowData(index, "totalTime", e.target.value)
                  }
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <select
                  value={timeSheet.status}
                  className="text-center border rounded"
                  onChange={(e) => setRowData(index, "status", e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value={"pending"}>pending</option>
                  <option value={"completed"}>completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="fixed bottom-0 left-0 py-1 text-center text-xs">
        {" "}
        {/* Reduced padding and smaller font size */}
        <table className="w-full">
          <tbody>
            <tr className="text-center">
              {[...new Set(timeSheet.map((item) => item.date))].map(
                (date, index) => (
                  <td
                    key={index}
                    className="border border-gray-400 px-2 py-1"
                    onClick={() => setDate(date)} // Set the date when clicked
                  >
                    {date}
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </footer>
    </div>
  );
}

export default UserTimeSheet;
