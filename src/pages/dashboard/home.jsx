import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { statisticsCardsData } from "@/data";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  CartesianGrid,
} from "recharts";
 
const employeeChartData = [
  { time: "08:00 AM", sale: 400, visitors: 100, employees: 80 },
  { time: "10:00 AM", sale: 390, visitors: 100, employees: 60 },
  { time: "12:00 PM", sale: 0, visitors: 0, employees: 40 },
  { time: "02:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "04:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "06:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "08:00 PM", sale: 0, visitors: 0, employees: 0 },
];
 
function EmployeeSaleCustomerChart() {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader floated={false} shadow={false} className="p-4">
        <Typography variant="h6" color="blue-gray">
          Employee/Sale/Customer (ratio)
        </Typography>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={employeeChartData}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" label={{ value: "Sale Amount", angle: -90, position: "insideLeft", fill: "red" }} stroke="red" />
              <YAxis yAxisId="right" orientation="right" label={{ value: "Customer & Employee Number", angle: 90, position: "insideRight", offset: 10, style: { fill: "blue", fontSize: 12, fontWeight: "bold" } }} stroke="blue" />
              <ReTooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sale" fill="#391eda" name="Sale" />
              <Bar yAxisId="right" dataKey="visitors" fill="#1ad5ee" name="Visitors" />
              <Line yAxisId="right" type="monotone" dataKey="employees" stroke="#16a34a" strokeWidth={2} name="Employee" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
 
function DashboardTables() {
  return (
    <div className="space-y-8">
      {/* Today's Schedule Table */}
     <Card>
  <CardHeader shadow={false} floated={false} className="bg-cyan-900 text-white p-4">
    <Typography variant="h6">Today's Schedule</Typography>
  </CardHeader>
  <CardBody className="overflow-auto">
    <table className="min-w-full table-auto text-sm text-left">
      <thead>
        <tr className="bg-blue-gray-100">
          <th className="p-2 border">Employees / Hours</th>
          <th className="p-2 border">9:00</th>
          <th className="p-2 border">10:00</th>
          <th className="p-2 border">11:00</th>
          <th className="p-2 border">12:00</th>
          <th className="p-2 border">1:00 PM</th>
          <th className="p-2 border">2:00 PM</th>
          <th className="p-2 border">3:00 PM</th>
          <th className="p-2 border">4:00 PM</th>
          <th className="p-2 border">5:00 PM</th>
          <th className="p-2 border">6:00 PM</th>
        </tr>
      </thead>
      <tbody>
        {["Me", "test employee", "Socium Employee", "Test Test"].map((name, index) => (
          <tr key={index} className="border-t align-top">
            <td className="p-2 border">
              <div className="flex flex-col justify-between h-full">
                <div>{name}</div>
               <div className="flex justify-between text-sm text-gray-600 w-full">
  <span>Average Customer</span>
  <span>${10 * (index + 1)}</span>
</div>
 
              </div>
            </td>
            {Array.from({ length: 10 }, (_, i) => (
              <td key={i} className="p-2 border"></td>
            ))}
          </tr>
        ))}
        <tr className="bg-blue-gray-50 font-bold">
          <td className="p-2">Wage Hours</td>
          {Array(10).fill(0).map((v, i) => (
            <td key={i} className="p-2 border">0</td>
          ))}
        </tr>
        <tr className="bg-blue-500 text-white font-bold">
          <td className="p-2">Sales</td>
          {Array(10).fill(0).map((v, i) => (
            <td key={i} className="p-2 border">0</td>
          ))}
        </tr>
      </tbody>
    </table>
  </CardBody>
</Card>
 
 
      {/* Time-Off Today */}
      <Card>
        <CardHeader shadow={false} floated={false} className="bg-cyan-900 text-white p-4">
    <Typography variant="h6">Time-Off today</Typography>
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
 
      {/* Flagged Time Card */}
      <Card>
         <CardHeader shadow={false} floated={false} className="bg-cyan-900 text-white p-4">
    <Typography variant="h6">Flagged Time card</Typography>
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
              <tr><td className="p-2">-</td><td className="p-2">-</td><td className="p-2">-</td></tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
 
      {/* No Show Employees */}
      <Card>
       <CardHeader shadow={false} floated={false} className="bg-cyan-900 text-white p-4">
    <Typography variant="h6">No Show employee</Typography>
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
              <tr><td className="p-2">-</td><td className="p-2">-</td><td className="p-2">-</td></tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
 
export function Home() {
  return (
    <div className="mt-12 space-y-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              footer?.label && (
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              )
            }
          />
        ))}
      </div>
 
      <div className="grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-3">
          <EmployeeSaleCustomerChart />
        </div>
      </div>
 
      {/* Added Dashboard Tables */}
      <DashboardTables />
    </div>
  );
}
 
export default Home;