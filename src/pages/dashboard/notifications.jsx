import React, { useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Button,
} from "@material-tailwind/react";
import {
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

export function Notifications() {
  const [collapsed, setCollapsed] = useState(false);
  const [editShift, setEditShift] = useState({ row: null, col: null });

  const [employees, setEmployees] = useState([
    {
      name: "Me",
      title: "Manager",
      wage: "$20/hr",
      avatar: "https://placehold.co/32x32",
      color: "green",
      shifts: [{ start: 0, end: 4, label: "6AM - 11 AM" }],
    },
    {
      name: "test empl",
      title: "Cashier",
      wage: "$15/hr",
      avatar: "https://placehold.co/32x32",
      color: "yellow",
      shifts: [{ start: 3, end: 8, label: "10AM - 3 PM" }],
    },
    {
      name: "Socium Emp",
      title: "Employee",
      wage: "$10/hr",
      avatar: "https://placehold.co/32x32",
      color: "yellow",
      shifts: [{ start: 3, end: 10, label: "10AM - 6PM" }],
    },
    {
      name: "Test Test",
      title: "Employee",
      wage: "$15/hr",
      avatar: "https://placehold.co/32x32",
      color: "green",
      shifts: [{ start: 0, end: 8, label: "6AM - 2PM" }],
    },
  ]);

  const timeSlots = [
    "6AM - 7AM", "7AM - 8AM", "8AM - 9AM", "9AM - 10AM", "10AM - 11AM",
    "11AM - 12PM", "12PM - 1PM", "1PM - 2PM", "2PM - 3PM", "3PM - 4PM",
    "4PM - 5PM", "5PM - 6PM", "6PM - 7PM", "7PM - 8PM",
  ];

  const handleSaveShift = (rowIndex, start, end) => {
    const newEmployees = [...employees];
    newEmployees[rowIndex].shifts = [{ start, end, label: `${timeSlots[start].split(" - ")[0]} - ${timeSlots[end - 1].split(" - ")[1]}` }];
    setEmployees(newEmployees);
    setEditShift({ row: null, col: null });
  };

  return (
    <div className="p-4">
      <Card className="w-full overflow-auto mt-4">
        <CardHeader floated={false} shadow={false} className="flex flex-col gap-4 p-4">
          <div className="flex justify-between">
            <Typography variant="h5">Schedule</Typography>
            <input type="text" placeholder="Search" className="border px-2 py-1 rounded" />
          </div>
          
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="table-auto border w-full text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">
                  <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-1">
                    {collapsed ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronUpIcon className="w-4 h-4" />}
                    Hours / Employees
                  </button>
                </th>
                {timeSlots.map((hour, idx) => (
                  <th key={idx} className="border px-2 py-1 whitespace-nowrap">{hour}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {employees.map((emp, rowIndex) => {
                if (collapsed && rowIndex >= 0 && rowIndex <= 4) return null;

                const shiftMap = Array(timeSlots.length).fill(null);
                emp.shifts.forEach((shift, idx) => {
                  shiftMap[shift.start] = { ...shift, span: shift.end - shift.start };
                  for (let i = shift.start + 1; i < shift.end; i++) {
                    shiftMap[i] = "skip";
                  }
                });

                return (
                  <tr key={rowIndex}>
                    <td className="border px-2 py-1 text-left">
                      <div className="flex items-center gap-2">
                        <Avatar src={emp.avatar} size="sm" />
                        <div>
                          <div className="font-semibold text-blue-700 text-sm">
                            {emp.name} <span className="text-black">{emp.wage}</span>
                          </div>
                          <div className="text-xs font-bold">{emp.title}</div>
                        </div>
                      </div>
                    </td>
                    {shiftMap.map((cell, colIndex) => {
                      if (cell === "skip") return null;

                      const isEditing = editShift.row === rowIndex && editShift.col === colIndex;

                      if (isEditing) {
                        return (
                          <td key={colIndex} colSpan={1} className="border px-1 py-1 bg-gray-50" style={{ minWidth: 150 }}>
                            <div className="flex flex-col gap-1">
                              <select
                                className="border text-xs p-1"
                                value={editShift.start}
                                onChange={(e) => setEditShift({ ...editShift, start: parseInt(e.target.value) })}
                              >
                                {timeSlots.map((slot, idx) => (
                                  <option key={idx} value={idx}>{slot}</option>
                                ))}
                              </select>
                              <select
                                className="border text-xs p-1"
                                value={editShift.end}
                                onChange={(e) => setEditShift({ ...editShift, end: parseInt(e.target.value) })}
                              >
                                {timeSlots.map((slot, idx) => (
                                  idx > editShift.start && <option key={idx} value={idx}>{slot}</option>
                                ))}
                              </select>
                              <div className="flex gap-1 justify-center">
                                <button
                                  className="bg-green-500 text-white px-2 py-0.5 text-xs rounded"
                                  onClick={() => handleSaveShift(rowIndex, editShift.start, editShift.end)}
                                >
                                  Save
                                </button>
                                <button
                                  className="bg-gray-300 px-2 py-0.5 text-xs rounded"
                                  onClick={() => setEditShift({ row: null, col: null })}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </td>
                        );
                      }

                      if (cell && cell.label) {
                        return (
                          <td
                            key={colIndex}
                            className={`border px-2 py-1 text-xs font-medium text-black text-center cursor-pointer`}
                            colSpan={cell.span}
                            style={{
                              backgroundColor: emp.color === "green" ? "#00FF00" : "#FFFF00",
                            }}
                            onClick={() =>
                              setEditShift({
                                row: rowIndex,
                                col: colIndex,
                                start: cell.start,
                                end: cell.end,
                              })
                            }
                          >
                            {cell.label} <PencilIcon className="inline w-3 h-3 ml-1" />
                          </td>
                        );
                      }

                      return (
                        <td
                          key={colIndex}
                          className="border px-2 py-1 text-blue-600 font-bold cursor-pointer"
                          onClick={() => setEditShift({ row: rowIndex, col: colIndex, start: colIndex, end: colIndex + 1 })}
                        >
                          +
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Summary Rows (do not remove) */}
              {[
                { label: "Total Employees Needed", data: [3, 3, 3, 2, 3, 2, 3, 3, 2, 2, 3, 3, 2, 2] },
                { label: "Total Employees Scheduled", data: [2, 2, 2, 2, 3, 2, 4, 4, 2, 2, 2, 2, 2, 2] },
                { label: "Wages", data: [0, 35, 35, 35, 40, 80, 90, 60, 60, 10, 25, 25, 25, 0], format: val => `$${val}` },
                {
                  label: "Average Sale", data: [0, 50, 50, 45, 85, 80, 95, 65, 60, 70, 50, 50, 50, 0],
                  style: val => val < 50 ? "text-red-500" : "text-green-500", format: val => `$${val}`
                },
                {
                  label: "Actual Sale", data: [0, 45, 45, 45, 85, 75, 85, 95, 65, 60, 35, 35, 35, 0],
                  style: val => val < 50 ? "text-red-500" : "text-green-500", format: val => `$${val}`
                },
              ].map(({ label, data, style = () => "", format = val => val }, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1 text-blue-600">{label}</td>
                  {data.map((val, i) => (
                    <td key={i} className={`border px-2 py-1 ${style(val)}`}>{format(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="pt-0 p-4 flex justify-center items-center">
          <Button variant="outlined" size="sm" color="blue-gray" className="text-white bg-[#3056d3]">
            Publish Schedule
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Notifications;
