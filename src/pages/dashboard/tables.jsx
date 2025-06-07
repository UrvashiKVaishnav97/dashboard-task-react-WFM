import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Button,
  Switch,
} from "@material-tailwind/react";
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  authorsTableData,
  projectsTableData,
} from "@/data";

// Profile Component
function Profile() {
  const [employees, setEmployees] = useState([
    {
      name: (
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-blue-700">
            Me <span className="text-black">$20/ hr</span>
          </span>
          <span className="text-xs font-bold">Owner</span>
        </div>
      ),
      shifts: ["6 am - 1 PM", "6 am - 1 PM", "6 am - 1 PM", "", "6 am - 1 PM", "", ""],
    },
    {
      name: (
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-blue-700">
            Test employee <span className="text-black">$20/ hr</span>
          </span>
          <span className="text-xs font-bold">Employee</span>
        </div>
      ),
      shifts: ["10 am - 4 PM", "10 am - 4 PM", "", "10 am - 4 PM", "", "", ""],
    },
    {
      name: (
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-blue-700">
            Socium Employee <span className="text-black">$10/ hr</span>
          </span>
          <span className="text-xs font-bold">Cashier</span>
        </div>
      ),
      shifts: ["10 am - 4 PM", "10 am - 4 PM", "6 am - 1 PM", "", "", "", ""],
    },
    {
      name: (
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-blue-700">
            Test <span className="text-black">$5/ hr</span>
          </span>
          <span className="text-xs font-bold">Employee</span>
        </div>
      ),
      shifts: ["", "10 am - 4 PM", "", "10 am - 4 PM", "", "", ""],
    },
  ]);

  const [editingCell, setEditingCell] = useState(null);
  const [tempShift, setTempShift] = useState("");

  const handleEditClick = (rowIndex, colIndex) => {
    setEditingCell({ rowIndex, colIndex });
    setTempShift(employees[rowIndex].shifts[colIndex] || "");
  };

  const saveShift = () => {
    if (!editingCell) return;
    const { rowIndex, colIndex } = editingCell;
    setEmployees((prev) => {
      const newEmployees = [...prev];
      newEmployees[rowIndex].shifts[colIndex] = tempShift;
      return newEmployees;
    });
    setEditingCell(null);
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setTempShift("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveShift();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full overflow-auto">
        <CardHeader floated={false} shadow={false} className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <Typography variant="h5">Schedule</Typography>
              <div className="flex items-center gap-2">
                <Typography variant="small">Manual</Typography>
                <Switch defaultChecked />
                <Typography variant="small">Auto scheduler</Typography>
              </div>
              <Button size="sm" variant="outlined" className="text-white bg-[#3056d3]">
                Schedule settings
              </Button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search"
                className="border px-2 py-1 rounded"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
            <div className="flex gap-4 items-center">
              <label className="text-sm">Locations</label>
              <select className="border px-2 py-1 rounded">
                <option>Florida</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-sm">Time frame</label>
              <Switch defaultChecked />
              <label className="text-sm">Employee list</label>
            </div>
            <div className="flex gap-4 items-center">
              <label>
                <input type="radio" name="view" /> Day
              </label>
              <label>
                <input type="radio" name="view" defaultChecked /> Week
              </label>
              <label>
                <input type="radio" name="view" /> Month
              </label>
              <Button size="sm"className="text-white bg-[#3056d3]">Update schedule</Button>
            </div>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="table-auto border w-full text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Days & Employees</th>
                {["06 Mon", "07 Tue", "08 Wed", "09 Thu", "10 Fri", "11 Sat", "12 Sun"].map((day) => (
                  <th key={day} className="border px-2 py-1">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border px-2 py-1 flex items-center gap-2">
                    <Avatar src="https://placehold.co/32x32" alt="avatar" size="sm" />
                    {employee.name}
                  </td>
                  {employee.shifts.map((shift, colIndex) => {
                    const isEditing = editingCell && editingCell.rowIndex === rowIndex && editingCell.colIndex === colIndex;
                    return (
                      <td key={colIndex} className="border px-2 py-1">
                        {isEditing ? (
                          <div className="flex items-center gap-1 justify-center">
                            <input
                              type="text"
                              value={tempShift}
                              onChange={(e) => setTempShift(e.target.value)}
                              onKeyDown={handleKeyDown}
                              onBlur={saveShift}
                              autoFocus
                              className="border rounded px-1 py-0.5 w-full text-center"
                            />
                            <button onClick={saveShift} className="text-green-600 hover:text-green-800" title="Save">
                              <CheckIcon className="w-5 h-5" />
                            </button>
                            <button onClick={cancelEdit} className="text-red-600 hover:text-red-800" title="Cancel">
                              <XMarkIcon className="w-5 h-5" />
                            </button>
                          </div>
                        ) : shift ? (
                          <div className="flex justify-center items-center gap-2">
                            <span className={`inline-block text-black text-xs px-2 py-1 rounded-full ${shift === "10 am - 4 PM" ? "bg-yellow-400" : "bg-green-500"}`}>
                              {shift}
                            </span>
                            <button onClick={() => handleEditClick(rowIndex, colIndex)} title="Edit shift" className="hover:text-blue-600">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center gap-2">
                            <span className="inline-block w-4 h-4 bg-gray-300 rounded-full" title="No shift" />
                            <button onClick={() => handleEditClick(rowIndex, colIndex)} title="Add shift" className="hover:text-blue-600">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="border px-2 py-1 text-blue-600">Total employees needed</td>
                <td className="border px-2 py-1">3</td><td className="border px-2 py-1">4</td><td className="border px-2 py-1">4</td>
                <td className="border px-2 py-1">2</td><td className="border px-2 py-1">1</td><td className="border px-2 py-1">3</td><td className="border px-2 py-1">1</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 text-blue-600">Total employees scheduled</td>
                <td className="border px-2 py-1">3</td><td className="border px-2 py-1">3</td><td className="border px-2 py-1">2</td>
                <td className="border px-2 py-1">2</td><td className="border px-2 py-1">0</td><td className="border px-2 py-1">1</td><td className="border px-2 py-1">1</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 text-blue-600">Wage/Hour</td>
                <td className="border px-2 py-1">$170</td><td className="border px-2 py-1">$270</td><td className="border px-2 py-1">$170</td>
                <td className="border px-2 py-1">$120</td><td className="border px-2 py-1">$0</td><td className="border px-2 py-1">$120</td><td className="border px-2 py-1">$40</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 text-blue-600">Average Sale</td>
                <td className="border px-2 py-1 text-green-500">$500</td><td className="border px-2 py-1 text-red-500">$300</td><td className="border px-2 py-1 text-red-500">$0.0</td>
                <td className="border px-2 py-1 text-green-500">$450</td><td className="border px-2 py-1 text-red-500">$0.0</td><td className="border px-2 py-1 text-green-500">$290</td><td className="border px-2 py-1 text-green-500">$90</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 text-blue-600">Actual Sales</td>
                <td className="border px-2 py-1 text-green-500">$500</td><td className="border px-2 py-1 text-red-500">$300</td><td className="border px-2 py-1 text-red-500">$0.0</td>
                <td className="border px-2 py-1 text-green-500">$450</td><td className="border px-2 py-1 text-red-500">$0.0</td><td className="border px-2 py-1 text-green-500">$290</td><td className="border px-2 py-1 text-green-500">$90</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="pt-0 p-4 flex justify-center items-center">
          <Button variant="outlined" size="sm" color="blue-gray" className="text-white bg-[#3056d3]">Publish Schedule</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Main Combined Component
export function Tables() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Profile />
      {/* You can add additional cards or tables here if needed */}
    </div>
  );
}

export default Tables;
