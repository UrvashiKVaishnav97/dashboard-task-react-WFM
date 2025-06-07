import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

function DashboardTables() {
  return (
    <div className="space-y-8">
      {/* Your Week Table */}
      <Card>
        <CardHeader shadow={false} floated={false} className="bg-cyan-900 text-white p-4">
          <Typography variant="h6">Your Week</Typography>
        </CardHeader>
        <CardBody className="overflow-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead>
              <tr className="bg-blue-gray-100">
                <th className="p-2 border">Day / Hours</th>
                {["9:00", "10:00", "11:00", "12:00", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map((time) => (
                  <th key={time} className="p-2 border">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                <tr key={index} className="border-t align-top">
                  <td className="p-2 border font-semibold">{day}</td>
                  {Array.from({ length: 10 }, (_, i) => (
                    <td key={i} className="p-2 border">{(index + i) % 3 === 0 ? "" : ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Time-Off Today */}
      <Card>
        <CardHeader shadow={false} floated={false} className="bg-cyan-900 text-white p-4">
          <Typography variant="h6">Upcoming Time-Off</Typography>
        </CardHeader>
        <CardBody>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2" colSpan={3}>No upcoming time offs today</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Trade of Request */}
      <Card>
        <CardHeader shadow={false} floated={false} className="bg-cyan-900 text-white p-4">
          <Typography variant="h6">Trade of Request</Typography>
        </CardHeader>
        <CardBody>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Shift</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Urvashi</td>
                <td className="p-2">2025-06-01</td>
                <td className="p-2">Morning <br></br>07:00 AM - 12:00 PM</td>
                <td className="p-2 text-yellow-600">Pending</td>
              </tr>
              <tr>
                <td className="p-2">Shweta</td>
                <td className="p-2">2025-06-03</td>
                <td className="p-2">Day <br></br>12:00 PM - 6:00 PM</td>
                <td className="p-2 text-green-600">Approved</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Week's Summary */}
      <Card>
        <CardHeader shadow={false} floated={false} className="bg-cyan-900 text-white p-4">
          <Typography variant="h6">Week's Summary</Typography>
        </CardHeader>
        <CardBody>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-gray-100">
                <th className="p-2">Scheduled hrs</th>
                <th className="p-2">Schedule est. wages</th>
                <th className="p-2">Actual hrs</th>
                <th className="p-2">Actual wages</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">40</td>
                <td className="p-2">$2000</td>
                <td className="p-2">50</td>
                <td className="p-2">$2500</td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export function Profile() {
  return (
    <div className="mt-12 space-y-12">
      <DashboardTables />
    </div>
  );
}

export default Profile;
